import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { SquadsPrimitives } from './Squads';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = {
  squads: SquadsPrimitives;
};

export class SoldiersSentToAttackDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.army.soldiersSentToAttack';

  constructor(props: OptionalDomainEventProps<SoldiersSentToAttackDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(SoldiersSentToAttackDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
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
  ): SoldiersSentToAttackDomainEvent {
    return new SoldiersSentToAttackDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(
    primitives: Primitives<SoldiersSentToAttackDomainEvent>
  ): SoldiersSentToAttackDomainEvent {
    return new SoldiersSentToAttackDomainEvent(primitives);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === SoldiersSentToAttackDomainEvent.TYPE;
  }
}
