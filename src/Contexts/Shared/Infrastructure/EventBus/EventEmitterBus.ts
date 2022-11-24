import { EventEmitter } from 'events';
import { DomainEvent } from '../../Domain/DomainEvent';
import { DomainEventSubscriber } from '../../Domain/DomainEventSubscriber';

export class EventEmitterBus extends EventEmitter {
  constructor(subscribers: Array<DomainEventSubscriber<DomainEvent<any>>>) {
    super();

    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: DomainEventSubscriber<DomainEvent<any>>[]) {
    subscribers?.map(subscriber => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventSubscriber<DomainEvent<any>>) {
    subscriber.subscribedTo().map(event => {
      this.on(event.TYPE, subscriber.on.bind(subscriber));
    });
  }

  publish(events: DomainEvent<any>[]): void {
    events.map(event => this.emit(event.type, event));
  }
}
