import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { AttackTroop } from '../../Attacks/Domain/AttackTroop';

type Attributes = {
  readonly troop: Primitives<AttackTroop>;
};

export class BattleTroopReturnedDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.battle.troopReturned';

  constructor(props: OptionalDomainEventProps<BattleTroopReturnedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(BattleTroopReturnedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  static fromBattlefieldInternalEvent(
    event: BattlefieldInternalEvent
  ): BattleTroopReturnedDomainEvent {
    return new BattleTroopReturnedDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(
    plainData: Primitives<BattleTroopReturnedDomainEvent>
  ): BattleTroopReturnedDomainEvent {
    return new BattleTroopReturnedDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === BattleTroopReturnedDomainEvent.TYPE;
  }
}
