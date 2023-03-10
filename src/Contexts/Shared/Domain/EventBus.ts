import { DomainEvent } from './DomainEvent';
import { DomainEventHandler } from './DomainEventHandler';

export abstract class EventBus {
  abstract publish(events: Array<DomainEvent<Record<string, unknown>>>): Promise<void>;

  abstract addSubscribers(
    subscribers: Array<DomainEventHandler<DomainEvent<Record<string, unknown>>>>
  ): void;
}
