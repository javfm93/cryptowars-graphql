import { DomainEvent } from '../../../Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Domain/DomainEventSubscriber';
import { EventBus } from '../../../Domain/EventBus';
import { DomainEventMapping } from '../DomainEventMapping';
import { EventEmitterBus } from '../EventEmitterBus';

export class InMemoryAsyncEventBus implements EventBus {
  private bus: EventEmitterBus;

  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent<Record<string, unknown>>>>) {
    this.bus = new EventEmitterBus(subscribers);
  }

  async start(): Promise<void> {}

  async publish(events: DomainEvent<Record<string, unknown>>[]): Promise<void> {
    this.bus.publish(events);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent<Record<string, unknown>>>>) {
    this.bus.registerSubscribers(subscribers);
  }

  setDomainEventMapping(domainEventMapping: DomainEventMapping): void {}
}
