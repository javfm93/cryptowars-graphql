import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type CreateTownDomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly playerId: string;
};

export class TownCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.town.created';
  readonly playerId: string;

  constructor({
    id,
    playerId,
    eventId,
    occurredOn
  }: {
    id: string;
    playerId: string;
    eventId?: string;
    occurredOn?: Date;
  }) {
    super(TownCreatedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.playerId = playerId;
  }

  toPrimitive(): CreateTownDomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: TownCreatedDomainEvent.EVENT_NAME,
      id: aggregateId,
      playerId: this.playerId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: CreateTownDomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new TownCreatedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn,
      playerId: body.playerId
    });
  }
}
