import { AttackSentDomainEvent } from './AttackSentDomainEvent';
import { AttackId } from './AttackId';
import { AttackTroop } from './AttackTroop';
import { AggregateRoot } from '../../Shared/Domain/FlatAggregateRoot';
import { ArmyId } from '../../Armies/Domain/ArmyId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { SquadTypes } from '../../Armies/Domain/Squads';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { AttackArrivedDomainEvent } from './AttackArrivedDomainEvent';

export class Attack extends AggregateRoot {
  private constructor(
    id: AttackId,
    readonly attackerTroop: AttackTroop,
    readonly defenderArmyId: ArmyId,
    readonly sentAt: string // todo: this should be Date? Take a look to primitives
  ) {
    super(id);
  }

  public static create(
    id: AttackId,
    attackerTroop: AttackTroop,
    defenderArmyId: ArmyId,
    attackSent: Date = new Date()
  ): Attack {
    const attack = new Attack(id, attackerTroop, defenderArmyId, attackSent.toISOString());

    attack.record(
      new AttackSentDomainEvent({
        aggregateId: attack.id.toString(),
        attackerTroop: attack.attackerTroop.toPrimitives(),
        defenderArmyId: attack.defenderArmyId.toString(),
        sentAt: new Date(attack.sentAt)
      })
    );

    return attack;
  }

  toPrimitives(): Primitives<Attack> {
    return {
      id: this.id.toString(),
      attackerTroop: this.attackerTroop.toPrimitives(),
      defenderArmyId: this.defenderArmyId.toString(),
      sentAt: this.sentAt
    };
  }

  static fromPrimitives(plainData: Primitives<Attack>): Attack {
    const id = AttackId.create(plainData.id);
    const attackerTroop = AttackTroop.fromPrimitives(plainData.attackerTroop);
    const defenderArmyId = ArmyId.create(plainData.defenderArmyId);
    const attackScheduledAt = plainData.sentAt.toString();
    return new Attack(id, attackerTroop, defenderArmyId, attackScheduledAt);
  }

  static materializeFrom(events: Array<BattlefieldInternalEvent>): Attack {
    let attack = Attack.create(
      Uuid.random(),
      AttackTroop.fromPrimitives({
        armyId: Uuid.random().toString(),
        squads: { [SquadTypes.basic]: 0 }
      }),
      ArmyId.random()
    );

    for (const event of events) {
      if (AttackSentDomainEvent.isMe(event)) {
        attack = AttackSentDomainEvent.fromBattlefieldInternalEvent(event).toAttack();
      } else if (AttackArrivedDomainEvent.isMe(event)) {
      } else {
        throw Error(
          `Unknown event [${event.id}] for attack materialization with name ${event.name}`
        );
      }
    }
    attack.pullDomainEvents();
    return attack;
  }
}
