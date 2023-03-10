import { DomainEvent } from './DomainEvent';
import { DomainEventSubscriber } from './DomainEventSubscriber';

export abstract class EventBus {
  abstract publish(events: Array<DomainEvent<Record<string, unknown>>>): Promise<void>;

  abstract addSubscribers(
    subscribers: Array<DomainEventSubscriber<DomainEvent<Record<string, unknown>>>>
  ): void;
}
