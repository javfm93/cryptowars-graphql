import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class TownCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.town.created';
  readonly playerId: string;

  constructor(props: OptionalDomainEventProps<TownCreatedDomainEvent>) {
    const { aggregateId, playerId, eventId, occurredOn } = props;
    super(TownCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.playerId = playerId;
  }

  toPrimitive(): Primitives<TownCreatedDomainEvent> {
    return {
      eventId: this.eventId,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      eventName: TownCreatedDomainEvent.EVENT_NAME,
      playerId: this.playerId
    };
  }

  static fromPrimitives(primitives: Primitives<TownCreatedDomainEvent>): DomainEvent {
    return new TownCreatedDomainEvent(primitives);
  }
}
