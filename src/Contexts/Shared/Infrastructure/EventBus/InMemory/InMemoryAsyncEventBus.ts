import { DomainEvent } from '../../../Domain/DomainEvent';
import { DomainEventHandler } from '../../../Domain/DomainEventHandler';
import { EventBus } from '../../../Domain/EventBus';
import { logger } from '../../WinstonLogger';

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;
};

export class InMemoryAsyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor() {
    this.subscriptions = new Map();
  }

  async publish(events: Array<DomainEvent<any>>): Promise<void> {
    logger.debug(`publishing events: ${events.map(e => e.type).join(' | ')}`);
    logger.debug(
      `publishing bodies: ${events.map(e => JSON.stringify(e.attributes, null, 4)).join(' | ')}`
    );
    events.map(event => {
      const subscribers = this.subscriptions.get(event.type);
      if (subscribers) {
        subscribers.map(subscriber => subscriber.boundedCallback(event));
      }
    });
  }

  addSubscribers(subscribers: Array<DomainEventHandler<DomainEvent<any>>>) {
    subscribers.map(subscriber =>
      subscriber.subscribedTo().map(event => this.subscribe(event.TYPE!, subscriber))
    );
  }

  private subscribe(topic: string, subscriber: DomainEventHandler<DomainEvent<any>>): void {
    const currentSubscriptions = this.subscriptions.get(topic);
    const subscription = {
      boundedCallback: subscriber.on.bind(subscriber),
      originalCallback: subscriber.on
    };
    if (currentSubscriptions) {
      currentSubscriptions.push(subscription);
    } else {
      this.subscriptions.set(topic, [subscription]);
    }
  }
}
