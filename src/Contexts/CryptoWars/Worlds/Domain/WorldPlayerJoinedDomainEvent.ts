import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type DomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly playerId: string;
};

export class WorldPlayerJoinedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.world.playerJoined';
  readonly playerId: string;

  constructor({
    id,
    eventId,
    occurredOn,
    playerId
  }: {
    id: string;
    eventId?: string;
    occurredOn?: Date;
    playerId: string;
  }) {
    super(WorldPlayerJoinedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.playerId = playerId;
  }

  toPrimitive(): DomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: WorldPlayerJoinedDomainEvent.EVENT_NAME,
      id: aggregateId,
      playerId: this.playerId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: DomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new WorldPlayerJoinedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn,
      playerId: body.playerId
    });
  }
}
