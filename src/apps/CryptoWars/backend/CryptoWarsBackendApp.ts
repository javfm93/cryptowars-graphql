import 'reflect-metadata';
import { DataSource } from 'typeorm';
import cryptoWarsConfig from '../../../Contexts/CryptoWars/Shared/Infrastructure/Config/cryptoWarsConfig';
import { ExecuteTasksPreviousToCommand } from '../../../Contexts/Scheduler/Tasks/Application/Execute/ExecuteTasksPreviousToCommand';
import { CommandBus } from '../../../Contexts/Shared/Domain/CommandBus';
import { EventBus } from '../../../Contexts/Shared/Domain/EventBus';
import { logger } from '../../../Contexts/Shared/Infrastructure/WinstonLogger';
import { ComponentTags, DependencyInjector } from './dependency-injection/dependencyInjector';
import { Server } from './server';

export class CryptoWarsBackendApp {
  server?: Server;
  interval?: NodeJS.Timeout;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    try {
      await this.registerSubscribers();
      await DependencyInjector.get(DataSource).initialize();
    } catch (e) {
      console.log(e);
    }
    this.initScheduler();
    return this.server.listen();
  }

  async stop() {
    logger.info('Stopping the scheduler and the server');
    if (this.interval) clearInterval(this.interval);
    return this.server?.stop();
  }

  get httpServer() {
    return this.server?.getHTTPServer();
  }

  private async registerSubscribers() {
    const eventBus = DependencyInjector.get(EventBus);
    eventBus.addSubscribers(DependencyInjector.getByTag(ComponentTags.domainEventHandler));
  }

  private initScheduler() {
    logger.info('Initializing the scheduler');
    const checkTasksEveryInMs = parseInt(cryptoWarsConfig.get('checkTasksEveryInMs'));
    const commandBus = DependencyInjector.get(CommandBus);
    this.interval = setInterval(async () => {
      try {
        const execute = new ExecuteTasksPreviousToCommand(Date.now());
        const result = await commandBus.dispatch(execute);
        if (result.isFailure()) logger.error(result.value);
      } catch (e: any) {
        logger.error(e.stack);
      }
    }, checkTasksEveryInMs);
  }
}
