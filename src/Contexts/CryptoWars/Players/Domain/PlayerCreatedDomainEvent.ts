import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class PlayerCreatedDomainEvent extends DomainEvent {
  static readonly EVENT_NAME = 'cryptoWars.1.event.player.created';

  constructor(props: OptionalDomainEventProps<PlayerCreatedDomainEvent>) {
    const { aggregateId, eventId, occurredOn } = props;
    super(PlayerCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
  }

  toPrimitive(): Primitives<PlayerCreatedDomainEvent> {
    return {
      eventId: this.eventId,
      eventName: PlayerCreatedDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn
    };
  }

  static fromPrimitives(aggregateId: string, eventId: string, occurredOn: Date): DomainEvent {
    return new PlayerCreatedDomainEvent({
      aggregateId,
      eventId,
      occurredOn
    });
  }
}
