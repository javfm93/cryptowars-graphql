import {Container as diodContainer, ContainerBuilder} from 'diod';
import {CommandBus} from '../../../../Contexts/Shared/Domain/CommandBus';
import {AbstractClass, Class} from '../../../../Contexts/Shared/Domain/Primitives';
import {CommandHandler, registeredCommandHandlers} from '../../../../Contexts/Shared/Domain/CommandHandler';
import {Command} from '../../../../Contexts/Shared/Domain/Command';
import {registeredUseCases} from '../../../../Contexts/Shared/Domain/UseCase';
import {EventBus} from '../../../../Contexts/Shared/Domain/EventBus';
import {
  InMemoryAsyncEventBus
} from '../../../../Contexts/Shared/Infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';
import {InMemoryQueryBus} from '../../../../Contexts/Shared/Infrastructure/QueryBus/InMemoryQueryBus';
import {QueryBus} from '../../../../Contexts/Shared/Domain/QueryBus';
import {QueryHandler, registeredQueryHandlers} from '../../../../Contexts/Shared/Domain/QueryHandler';
import {QueryHandlersInformation} from '../../../../Contexts/Shared/Infrastructure/QueryBus/QueryHandlersInformation';
import {
  CommandHandlersInformation
} from '../../../../Contexts/Shared/Infrastructure/CommandBus/CommandHandlersInformation';
import {InMemoryCommandBus} from '../../../../Contexts/Shared/Infrastructure/CommandBus/InMemoryCommandBus';
import {Connection} from 'typeorm';
import {TypeOrmClientFactory} from '../../../../Contexts/Shared/Infrastructure/Persistence/Sqlite/TypeOrmClientFactory';
import {
  TypeOrmConfigFactory
} from '../../../../Contexts/CryptoWars/Shared/Infrastructure/Persistence/Sqlite/TypeOrmConfigFactory2';

export const enum ComponentTags {
  commandHandler = 'commandHandler',
  queryHandler = 'queryHandler',
  eventHandler = 'eventHandler'
}

export class DependencyInjector {
  private builder: ContainerBuilder;
  private static instance: DependencyInjector;
  private dependencies?: diodContainer;

  private constructor() {
    this.builder = new ContainerBuilder();
  }

  static get<Dependency>(dependency: Class<Dependency>): Dependency {
    const dependencyInjector = this.getInstance();
    if (!dependencyInjector.dependencies) throw Error('The container was not built');
    return dependencyInjector.dependencies.get(dependency);
  }

  static registerAndUse(component: Class<any>) {
    const dependencyInjector = this.getInstance();
    return dependencyInjector.builder.registerAndUse(component);
  }

  static register(component: AbstractClass<any>) {
    const dependencyInjector = this.getInstance();
    return dependencyInjector.builder.register(component);
  }

  static getInstance(): DependencyInjector {
    if (!DependencyInjector.instance) {
      DependencyInjector.instance = new DependencyInjector();
    }

    return DependencyInjector.instance;
  }

  registerComponents(): this {
    this.registerDatabaseConnection();
    this.registerCommandHandlers();
    this.registerQueryHandlers();
    this.registerUseCases();
    this.registerBuses();

    return this;
  }

  build() {
    this.dependencies = this.builder.build();
  }

  private registerDatabaseConnection() {
    this.builder.register(Promise<Connection>)
      .useFactory(() =>
        TypeOrmClientFactory.createClient('Shared2', TypeOrmConfigFactory.createConfig())
      )
      .asSingleton();
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
        .findTaggedServiceIdentifiers<QueryHandler<any, any>>(ComponentTags.queryHandler)
        .map(identifier => c.get(identifier));
      return new QueryHandlersInformation(queryHandlers);
    });
  }

  private registerBuses() {
    this.builder.register(CommandBus).use(InMemoryCommandBus);
    this.builder.register(EventBus).use(InMemoryAsyncEventBus);
    this.builder.register(QueryBus).use(InMemoryQueryBus);
  }

  private registerUseCases() {
    registeredUseCases.forEach(useCase => this.builder.registerAndUse(useCase));
  }
}
