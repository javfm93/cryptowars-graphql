import { OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { AttackTroop } from './AttackTroop';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Attack } from './Attack';

type Attributes = {
  attackerTroop: Primitives<AttackTroop>;
  defenderArmyId: string;
  sentAt: Date;
};

export class AttackSentDomainEvent extends BattlefieldExposedEvent<Attributes> {
  static readonly TYPE = 'battlefield.1.event.attack.sent';

  constructor(props: OptionalDomainEventProps<AttackSentDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    const att: Attributes | undefined = attributes
      ? { ...attributes, sentAt: new Date(attributes.sentAt) }
      : attributes;
    super(AttackSentDomainEvent.TYPE, aggregateId, att, meta, occurredOn, id);
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.id), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.type,
      data: this.attributes
    });
  }

  toAttack(): Attack {
    return Attack.fromPrimitives({
      id: this.aggregateId,
      attackerTroop: this.attributes.attackerTroop,
      defenderArmyId: this.attributes.defenderArmyId,
      sentAt: this.attributes.sentAt.toISOString()
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): AttackSentDomainEvent {
    return new AttackSentDomainEvent({
      aggregateId: event.aggregateId,
      id: event.id.toString(),
      attributes: event.toPrimitives().data
    });
  }

  static fromPrimitives(plainData: Primitives<AttackSentDomainEvent>): AttackSentDomainEvent {
    return new AttackSentDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === AttackSentDomainEvent.TYPE;
  }
}
