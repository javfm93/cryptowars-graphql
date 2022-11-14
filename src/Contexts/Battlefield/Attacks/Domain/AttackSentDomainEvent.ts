import { DomainEvent } from '../../../Shared/Domain/DomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldExposedEvent } from '../../Shared/Domain/BattlefieldExposedEvent';
import { AttackTroop } from './AttackTroop';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Attack } from './Attack';

type BattleScheduledDomainEventBody = {
  readonly eventName: string;
  readonly aggregateId: string;
  readonly occurredOn: Date;
  readonly attackerTroop: Primitives<AttackTroop>;
  readonly defenderArmyId: string;
  readonly sentAt: Date;
};

export class AttackSentDomainEvent extends BattlefieldExposedEvent {
  static readonly EVENT_NAME = 'battlefield.1.event.attack.sent';
  readonly attackerTroop: Primitives<AttackTroop>;
  readonly defenderArmyId: string;
  readonly sentAt: Date;

  constructor(props: {
    aggregateId: string;
    eventId?: string;
    occurredOn?: Date;
    attackerTroop: Primitives<AttackTroop>;
    defenderArmyId: string;
    sentAt: Date;
  }) {
    const { aggregateId, eventId, occurredOn, attackerTroop, defenderArmyId, sentAt } = props;
    super(AttackSentDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn);
    this.attackerTroop = attackerTroop;
    this.defenderArmyId = defenderArmyId;
    this.sentAt = sentAt;
  }

  toPrimitive(): Primitives<AttackSentDomainEvent> {
    return {
      eventId: this.eventId,
      eventName: AttackSentDomainEvent.EVENT_NAME,
      aggregateId: this.aggregateId,
      occurredOn: this.occurredOn,
      attackerTroop: this.attackerTroop,
      defenderArmyId: this.defenderArmyId,
      sentAt: this.sentAt
    };
  }

  toBattlefieldInternalEvent(): BattlefieldInternalEvent {
    return new BattlefieldInternalEvent(new Uuid(this.eventId), {
      aggregateId: this.aggregateId,
      version: 0,
      eventName: this.eventName,
      data: {
        attackerTroop: this.attackerTroop,
        defenderArmyId: this.defenderArmyId,
        sentAt: this.sentAt
      }
    });
  }

  toAttack(): Attack {
    return Attack.fromPrimitives({
      id: this.aggregateId,
      attackerTroop: this.attackerTroop,
      defenderArmyId: this.defenderArmyId,
      sentAt: this.sentAt.toISOString()
    });
  }

  static fromBattlefieldInternalEvent(event: BattlefieldInternalEvent): AttackSentDomainEvent {
    return new AttackSentDomainEvent({
      aggregateId: event.aggregateId,
      eventId: event.id.toString(),
      attackerTroop: event.toPrimitives().data.attackerTroop,
      defenderArmyId: event.toPrimitives().data.defenderArmyId,
      sentAt: new Date(event.toPrimitives().data.sentAt)
    });
  }

  static fromPrimitives(plainData: BattleScheduledDomainEventBody): DomainEvent {
    return new AttackSentDomainEvent(plainData);
  }

  static isMe(event: BattlefieldInternalEvent): boolean {
    return event.name === AttackSentDomainEvent.EVENT_NAME;
  }
}
