import { DomainEvent } from './DomainEvent';
import { DomainEventSubscriber } from './DomainEventSubscriber';

export interface EventBus {
  publish(events: Array<DomainEvent<Record<string, unknown>>>): Promise<void>;

  addSubscribers(
    subscribers: Array<DomainEventSubscriber<DomainEvent<Record<string, unknown>>>>
  ): void;
}
