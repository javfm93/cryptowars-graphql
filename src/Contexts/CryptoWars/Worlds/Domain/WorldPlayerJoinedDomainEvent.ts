import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = {
  playerId: string;
};

export class WorldPlayerJoinedDomainEvent extends DomainEvent<Attributes> {
  static readonly TYPE = 'cryptoWars.1.event.world.playerJoined';

  constructor(props: OptionalDomainEventProps<WorldPlayerJoinedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(WorldPlayerJoinedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(
    primitives: Primitives<WorldPlayerJoinedDomainEvent>
  ): WorldPlayerJoinedDomainEvent {
    return new WorldPlayerJoinedDomainEvent(primitives);
  }
}
