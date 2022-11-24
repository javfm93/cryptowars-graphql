import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class PlayerCreatedDomainEvent extends DomainEvent<{}> {
  static readonly TYPE = 'cryptoWars.1.event.player.created';

  constructor(props: OptionalDomainEventProps<PlayerCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(PlayerCreatedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(
    primitives: Primitives<PlayerCreatedDomainEvent>
  ): PlayerCreatedDomainEvent {
    return new PlayerCreatedDomainEvent(primitives);
  }
}
