import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class WorldPlayerJoinedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.world.playerJoined';
  readonly playerId: string;

  constructor(props: OptionalDomainEventProps<WorldPlayerJoinedDomainEvent>) {
    const { aggregateId, eventId, occurredOn, playerId } = props;
    super(WorldPlayerJoinedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.playerId = playerId;
  }

  toPrimitive(): Primitives<WorldPlayerJoinedDomainEvent> {
    return {
      eventId: this.eventId,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventName: WorldPlayerJoinedDomainEvent.EVENT_NAME,
      playerId: this.playerId
    };
  }

  static fromPrimitives(primitives: Primitives<WorldPlayerJoinedDomainEvent>): DomainEvent {
    return new WorldPlayerJoinedDomainEvent(primitives);
  }
}
