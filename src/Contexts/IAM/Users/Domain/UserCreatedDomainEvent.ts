import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.user.created';

  constructor({
    aggregateId,
    eventId,
    occurredOn
  }: OptionalDomainEventProps<UserCreatedDomainEvent>) {
    super(UserCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
  }

  toPrimitive(): Primitives<UserCreatedDomainEvent> {
    return {
      eventId: this.eventId,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventName: UserCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(primitives: Primitives<UserCreatedDomainEvent>): DomainEvent {
    return new UserCreatedDomainEvent(primitives);
  }
}
