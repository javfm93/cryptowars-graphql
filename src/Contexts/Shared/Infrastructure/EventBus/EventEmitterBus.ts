import { EventEmitter } from 'events';
import { DomainEvent } from '../../Domain/DomainEvent';
import { DomainEventHandler } from '../../Domain/DomainEventHandler';

export class EventEmitterBus extends EventEmitter {
  constructor(subscribers: Array<DomainEventHandler<DomainEvent<any>>>) {
    super();

    this.registerSubscribers(subscribers);
  }

  registerSubscribers(subscribers?: DomainEventHandler<DomainEvent<any>>[]) {
    subscribers?.map(subscriber => {
      this.registerSubscriber(subscriber);
    });
  }

  private registerSubscriber(subscriber: DomainEventHandler<DomainEvent<any>>) {
    subscriber.subscribedTo().map(event => {
      this.on(event.TYPE, subscriber.on.bind(subscriber));
    });
  }

  publish(events: DomainEvent<any>[]): void {
    events.map(event => this.emit(event.type, event));
  }
}
