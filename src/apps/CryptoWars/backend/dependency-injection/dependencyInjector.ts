import { Container as diodContainer, ContainerBuilder } from 'diod';
import { CommandHandlers } from '../../../../Contexts/Shared/Infrastructure/CommandBus2/CommandHandlers';
import { CommandBus } from '../../../../Contexts/Shared/Domain/CommandBus';
import { AbstractClass, Class } from '../../../../Contexts/Shared/Domain/Primitives';
import {
  CommandHandler,
  registeredCommandHandlers
} from '../../../../Contexts/Shared/Domain/CommandHandler';
import { Command } from '../../../../Contexts/Shared/Domain/Command';
import { InMemoryCommandBus } from '../../../../Contexts/Shared/Infrastructure/CommandBus2/InMemoryCommandBus';
import { registeredUseCases } from '../../../../Contexts/Shared/Domain/UseCase';
import { EventBus } from '../../../../Contexts/Shared/Domain/EventBus';
import { InMemoryAsyncEventBus } from '../../../../Contexts/Shared/Infrastructure/EventBus/InMemory/InMemoryAsyncEventBus';

export const enum ComponentTags {
  commandHandler = 'commandHandler'
}

export class DependencyInjector {
  private builder: ContainerBuilder;
  private static instance: DependencyInjector;
  private dependencies?: diodContainer; // get container

  private constructor() {
    this.builder = new ContainerBuilder();
  }

  static get(): DependencyInjector {
    if (!DependencyInjector.instance) {
      DependencyInjector.instance = new DependencyInjector();
    }

    return DependencyInjector.instance;
  }

  registerComponents(): this {
    this.registerCommandHandlers();
    this.registerUseCases();
    this.registerBuses();
    return this;
  }

  registerAndUse(component: Class<any>) {
    return this.builder.registerAndUse(component);
  }

  register(component: AbstractClass<any>) {
    return this.builder.register(component);
  }

  build() {
    this.dependencies = this.builder.build();
  }

  getDependency(dependency: Class<any>) {
    if (!this.dependencies) throw Error('The container was not built');
    return this.dependencies.get(dependency);
  }

  private registerCommandHandlers() {
    registeredCommandHandlers.forEach(commandHandler => {
      this.builder.registerAndUse(commandHandler).addTag(ComponentTags.commandHandler);
    });
    this.builder.register(CommandHandlers).useFactory(c => {
      const commandHandlers = c
        .findTaggedServiceIdentifiers<CommandHandler<Command>>(ComponentTags.commandHandler)
        .map(identifier => c.get(identifier));
      return new CommandHandlers(commandHandlers);
    });
  }

  private registerBuses() {
    this.builder.register(CommandBus).use(InMemoryCommandBus);
    this.builder.register(EventBus).use(InMemoryAsyncEventBus);
  }

  private registerUseCases() {
    registeredUseCases.forEach(useCase => this.builder.registerAndUse(useCase));
  }
}
