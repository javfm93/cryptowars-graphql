import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type CreateUserDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
};

export class PlayerCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.player.created';

  constructor({ id, eventId, occurredOn }: { id: string; eventId?: string; occurredOn?: Date }) {
    super(PlayerCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
  }

  toPrimitive(): CreateUserDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: PlayerCreatedDomainEvent.EVENT_NAME,
      id: aggregateId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateUserDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new PlayerCreatedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn
    });
  }
}
