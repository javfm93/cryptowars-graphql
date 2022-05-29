import { Definition } from 'node-dependency-injection';
import container from './dependency-injection';
import { Server } from './server';
import { EventBus } from '../../../Contexts/Shared/domain/EventBus';
import { DomainEventSubscriber } from '../../../Contexts/Shared/domain/DomainEventSubscriber';
import { DomainEvent } from '../../../Contexts/Shared/domain/DomainEvent';
import { DomainEventMapping } from '../../../Contexts/Shared/infrastructure/EventBus/DomainEventMapping';

export class CryptoWarsBackendApp {
  server?: Server;

  async start() {
    const port = process.env.PORT || '5000';
    this.server = new Server(port);
    try {
      await this.registerSubscribers();
    } catch (e) {
      console.log(e);
    }
    return this.server.listen();
  }

  async stop() {
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
}
