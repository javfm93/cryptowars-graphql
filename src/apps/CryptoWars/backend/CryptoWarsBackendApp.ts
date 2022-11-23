import { Definition } from 'node-dependency-injection';
import container from './dependency-injection';
import { Server } from './server';
import { EventBus } from '../../../Contexts/Shared/Domain/EventBus';
import { DomainEventSubscriber } from '../../../Contexts/Shared/Domain/DomainEventSubscriber';
import { DomainEvent } from '../../../Contexts/Shared/Domain/DomainEvent';
import { DomainEventMapping } from '../../../Contexts/Shared/Infrastructure/EventBus/DomainEventMapping';
import { CommandBus } from '../../../Contexts/Shared/Domain/CommandBus';
import { ExecuteTasksPreviousToCommand } from '../../../Contexts/Scheduler/Tasks/Application/Execute/ExecuteTasksPreviousToCommand';
import { logger } from '../../../Contexts/Shared/Infrastructure/WinstonLogger';
import cryptoWarsConfig from '../../../Contexts/CryptoWars/Shared/Infrastructure/Config/cryptoWarsConfig';

export class CryptoWarsBackendApp {
  server?: Server;
  interval?: NodeJS.Timeout;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    try {
      await this.registerSubscribers();
    } catch (e) {
      console.log(e);
    }
    this.initScheduler();
    return this.server.listen();
  }

  async stop() {
    logger.info('Stopping the scheduler and the server');
    clearInterval(this.interval);
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  private async registerSubscribers() {
    const eventBus = container.get('Shared.EventBus') as EventBus;
    const subscriberDefinitions = container.findTaggedServiceIds('domainEventSubscriber') as Map<
      String,
      Definition
    >;
    const subscribers: Array<DomainEventSubscriber<DomainEvent>> = [];

    subscriberDefinitions.forEach((value: any, key: any) => subscribers.push(container.get(key)));
    const domainEventMapping = new DomainEventMapping(subscribers);

    eventBus.setDomainEventMapping(domainEventMapping);
    eventBus.addSubscribers(subscribers);
    await eventBus.start();
  }

  private initScheduler() {
    logger.info('Initializing the scheduler');
    const checkTasksEveryInMs = parseInt(cryptoWarsConfig.get('checkTasksEveryInMs'));
    const commandBus: CommandBus = container.get('Shared.CommandBus');
    this.interval = setInterval(async () => {
      const execute = new ExecuteTasksPreviousToCommand(Date.now());
      const result = await commandBus.dispatch(execute);
      if (result.isFailure()) logger.error(result.value);
    }, checkTasksEveryInMs);
  }
}
