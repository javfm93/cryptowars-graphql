import { DomainEvent } from '../../../Shared/Domain/DomainEvent';

type DomainEventBody = {
  readonly eventName: string;
  readonly id: string;
  readonly worldId: string;
};

export class PlayerWorldSelectedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.player.worldSelected';
  readonly worldId: string;

  constructor({
    id,
    eventId,
    occurredOn,
    worldId
  }: {
    id: string;
    eventId?: string;
    occurredOn?: Date;
    worldId: string;
  }) {
    super(PlayerWorldSelectedDomainEvent.EVENT_NAME, id, eventId, occurredOn);
    this.worldId = worldId;
  }

  toPrimitive(): DomainEventBody {
    const { aggregateId } = this;
    return {
      eventName: PlayerWorldSelectedDomainEvent.EVENT_NAME,
      id: aggregateId,
      worldId: this.worldId
    };
  }

  static fromPrimitives(
    aggregateId: string,
    body: DomainEventBody,
    eventId: string,
    occurredOn: Date
  ): DomainEvent {
    return new PlayerWorldSelectedDomainEvent({
      id: aggregateId,
      eventId,
      occurredOn,
      worldId: body.worldId
    });
  }
}
