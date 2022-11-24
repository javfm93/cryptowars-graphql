import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class AttackArrivedDomainEvent extends BattlefieldExposedEvent<{}> {
  static readonly TYPE = 'battlefield.1.event.attack.arrived';

  constructor(props: OptionalDomainEventProps<AttackArrivedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(AttackArrivedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: { startedAt: this.occurredOn }
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): AttackArrivedDomainEvent {
    return new AttackArrivedDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      occurredOn: event.toPrimitives().data.startedAt
    });
  }

  static fromPrimitives(plainData: Primitives<AttackArrivedDomainEvent>): AttackArrivedDomainEvent {
    return new AttackArrivedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === AttackArrivedDomainEvent.TYPE;
  }
}
