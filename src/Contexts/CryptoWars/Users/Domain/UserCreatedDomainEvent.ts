import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type CreateUserDomainEventBody = {};

type CreateUserDomainEventPrimitives = CreateUserDomainEventBody & {
  readonly eventName: string;
};

export class UserCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.user.created';

  constructor({ id, eventId, occurredOn }: { id: string; eventId?: string; occurredOn?: Date }) {
    super(UserCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
  }

  toPrimitive(): CreateUserDomainEventPrimitives {
    return {
      eventName: UserCreatedDomainEvent.EVENT_NAME
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateUserDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new UserCreatedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn
    });
  }
}
