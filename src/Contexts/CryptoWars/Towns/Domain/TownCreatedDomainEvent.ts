import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = {
  playerId: string;
};

export class TownCreatedDomainEvent extends DomainEvent<Attributes> {
  static readonly TYPE = 'cryptoWars.1.event.town.created';

  constructor(props: OptionalDomainEventProps<TownCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(TownCreatedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(primitives: Primitives<TownCreatedDomainEvent>): TownCreatedDomainEvent {
    return new TownCreatedDomainEvent(primitives);
  }
}
