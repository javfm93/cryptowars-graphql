import { Container as diodContainer, ContainerBuilder } from 'diod';
import { CommandBus } from '../../../../Contexts/Shared/Domain/CommandBus';
import { AbstractClass, Class } from '../../../../Contexts/Shared/Domain/Primitives';
import {
  CommandHandler,
  registeredCommandHandlers
} from '../../../../Contexts/Shared/Domain/CommandHandler';
import { Command } from '../../../../Contexts/Shared/Domain/Command';
import { registeredUseCases } from '../../../../Contexts/Shared/Domain/BaseUseCase';
import { EventBus } from '../../../../Contexts/Shared/Domain/EventBus';
import { InMemoryAsyncEventBus } from '../../../../Contexts/Shared/Infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';
import { InMemoryQueryBus } from '../../../../Contexts/Shared/Infrastructure/QueryBus/InMemoryQueryBus';
import { QueryBus } from '../../../../Contexts/Shared/Domain/QueryBus';
import {
  BaseQueryHandler,
  registeredQueryHandlers
} from '../../../../Contexts/Shared/Domain/BaseQueryHandler';
import { QueryHandlersInformation } from '../../../../Contexts/Shared/Infrastructure/QueryBus/QueryHandlersInformation';
import { CommandHandlersInformation } from '../../../../Contexts/Shared/Infrastructure/CommandBus/CommandHandlersInformation';
import { InMemoryCommandBus } from '../../../../Contexts/Shared/Infrastructure/CommandBus/InMemoryCommandBus';
import { DataSource } from 'typeorm';
import { TypeOrmClientFactory } from '../../../../Contexts/Shared/Infrastructure/Persistence/Sqlite/TypeOrmClientFactory';
import { TypeOrmConfigFactory } from '../../../../Contexts/CryptoWars/Shared/Infrastructure/Persistence/Sqlite/TypeOrmConfigFactory';
import WinstonLogger from '../../../../Contexts/Shared/Infrastructure/WinstonLogger';
import Logger from '../../../../Contexts/Shared/Domain/Logger';
import { EnvironmentArranger } from '../../../../../tests/Contexts/Shared/Infrastructure/arranger/EnvironmentArranger';
import { TypeOrmEnvironmentArranger } from '../../../../../tests/Contexts/Shared/Infrastructure/Persistence/TypeOrmEnvironmentArranger';
import { registeredDomainEventHandlers } from '../../../../Contexts/Shared/Domain/DomainEventHandler';
import { ComponentDiscovery } from './componentDiscovery';
import { InMemorySyncEventBus } from '../../../../Contexts/Shared/Infrastructure/EventBus/InMemory/InMemorySyncEventBus';

export enum ComponentTags {
  commandHandler = 'commandHandler',
  queryHandler = 'queryHandler',
  domainEventHandler = 'domainEventHandler',
  controller = 'controller',
  socketEventHandler = 'socketEventHandler',
  useCase = 'useCase',
  repository = 'repository',
  resolver = 'resolver'
}

export class DependencyInjector {
  private builder: ContainerBuilder;
  private static instance: DependencyInjector;
  private container?: diodContainer;

  private constructor() {
    this.builder = new ContainerBuilder();
  }

  static init() {
    ComponentDiscovery.scan();
    DependencyInjector.getInstance().registerComponents().build();
    return this;
  }

  static async initForRepositories() {
    ComponentDiscovery.scanRepositories();
    DependencyInjector.getInstance().registerDatabaseConnection().build();
    await DependencyInjector.get(DataSource).initialize();
    return this;
  }

  static registerAndUse(component: Class<any>) {
    const dependencyInjector = this.getInstance();
    return dependencyInjector.builder.registerAndUse(component);
  }

  static register(component: AbstractClass<any>) {
    const dependencyInjector = this.getInstance();
    return dependencyInjector.builder.register(component);
  }

  static get<Dependency>(dependency: Class<Dependency> | AbstractClass<Dependency>): Dependency {
    return this.getContainer().get(dependency);
  }

  static getContainer() {
    const dependencyInjector = this.getInstance();
    if (!dependencyInjector.container) throw Error('The container was not built');
    return dependencyInjector.container;
  }

  static getByTag<Dependency>(tag: ComponentTags): Array<Dependency> {
    const container = this.getContainer();
    return container
      .findTaggedServiceIdentifiers<Dependency>(tag)
      .map(identifier => container.get(identifier));
  }

  private static getInstance(): DependencyInjector {
    if (!DependencyInjector.instance) {
      DependencyInjector.instance = new DependencyInjector();
    }
    return DependencyInjector.instance;
  }

  private registerComponents(): this {
    // console.debug('Starting Component Registration Process');
    this.registerDatabaseConnection();
    this.registerCommandHandlers();
    this.registerQueryHandlers();
    this.registerDomainEventHandlers();
    this.registerUseCases();
    this.registerBuses();
    this.builder.register(Logger).use(WinstonLogger);
    this.registerEnvironmentSpecificDependencies();
    return this;
  }

  private build() {
    this.container = this.builder.build();
    // Object.values(ComponentTags).forEach(tag =>
    // console.debug(
    //   ` - Registered ${this.container!.findTaggedServiceIdentifiers(tag).length} ${tag}`
    // )
    // );
    // console.debug('Finished Component Registration Process \n');
  }

  private registerDatabaseConnection() {
    this.builder
      .register(DataSource)
      .useFactory(() =>
        TypeOrmClientFactory.createClient('Shared', TypeOrmConfigFactory.createConfig())
      )
      .asSingleton();
    return this;
  }

  private registerCommandHandlers() {
    registeredCommandHandlers.forEach(commandHandler => {
      this.builder.registerAndUse(commandHandler).addTag(ComponentTags.commandHandler);
    });
    this.builder.register(CommandHandlersInformation).useFactory(c => {
      const commandHandlers = c
        .findTaggedServiceIdentifiers<CommandHandler<Command>>(ComponentTags.commandHandler)
        .map(identifier => c.get(identifier));
      return new CommandHandlersInformation(commandHandlers);
    });
  }

  private registerQueryHandlers() {
    registeredQueryHandlers.forEach(handler => {
      this.builder.registerAndUse(handler).addTag(ComponentTags.queryHandler);
    });
    this.builder.register(QueryHandlersInformation).useFactory(c => {
      const queryHandlers = c
        .findTaggedServiceIdentifiers<BaseQueryHandler<any, any>>(ComponentTags.queryHandler)
        .map(identifier => c.get(identifier));
      return new QueryHandlersInformation(queryHandlers);
    });
  }

  private registerDomainEventHandlers() {
    registeredDomainEventHandlers.forEach(handler => {
      this.builder.registerAndUse(handler).addTag(ComponentTags.domainEventHandler);
    });
  }

  private registerBuses() {
    this.builder.register(CommandBus).use(InMemoryCommandBus).asSingleton();
    this.builder.register(QueryBus).use(InMemoryQueryBus).asSingleton();
  }

  private registerUseCases() {
    registeredUseCases.forEach(useCase =>
      this.builder.registerAndUse(useCase).addTag(ComponentTags.useCase)
    );
  }

  private registerEnvironmentSpecificDependencies() {
    switch (process.env.NODE_ENV || 'development') {
      case 'development':
        this.builder.register(EventBus).use(InMemoryAsyncEventBus).asSingleton();
        break;
      case 'test': {
        this.builder.register(EventBus).use(InMemorySyncEventBus).asSingleton();
        this.builder.register(EnvironmentArranger).use(TypeOrmEnvironmentArranger);
        break;
      }
      case 'integration': {
        this.builder.register(EventBus).use(InMemorySyncEventBus).asSingleton();
        this.builder.register(EnvironmentArranger).use(TypeOrmEnvironmentArranger);
        break;
      }
      case 'production':
        this.builder.register(EventBus).use(InMemoryAsyncEventBus).asSingleton();
        break;
      default: {
        throw new Error(`${process.env.NODE_ENV} environment is not valid`);
      }
    }
  }
}
