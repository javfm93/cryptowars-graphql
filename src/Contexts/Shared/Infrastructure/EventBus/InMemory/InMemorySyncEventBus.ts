import { DomainEvent } from '../../../Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../Domain/DomainEventSubscriber';
import { EventBus } from '../../../Domain/EventBus';

type Subscription = {
  boundedCallback: Function;
  originalCallback: Function;
};

export class InMemorySyncEventBus implements EventBus {
  private subscriptions: Map<string, Array<Subscription>>;

  constructor() {
    this.subscriptions = new Map();
  }

  async publish(events: Array<DomainEvent<any>>): Promise<void> {
    const executions: any = [];
    events.map(event => {
      const subscribers = this.subscriptions.get(event.type);
      if (subscribers) {
        return subscribers.map(subscriber => executions.push(subscriber.boundedCallback(event)));
      }
    });

    await Promise.all(executions);
  }

  addSubscribers(subscribers: Array<DomainEventSubscriber<DomainEvent<any>>>) {
    subscribers.map(subscriber =>
      subscriber.subscribedTo().map(event => this.subscribe(event.TYPE!, subscriber))
    );
  }

  private subscribe(topic: string, subscriber: DomainEventSubscriber<DomainEvent<any>>): void {
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
