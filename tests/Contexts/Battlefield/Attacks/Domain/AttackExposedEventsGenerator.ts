import { SendAttackCommand } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import { AttackSentDomainEvent } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackSentDomainEvent';
import { AttackTroop } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackTroop';
import { Squads } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { AttackArrivedDomainEvent } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackArrivedDomainEvent';
import { Attack } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/Attack';

export class AttackExposedEventsGenerator {
  static attackSentFrom(command: SendAttackCommand, defenderArmy: Army): AttackSentDomainEvent {
    return new AttackSentDomainEvent({
      aggregateId: command.id,
      attackerTroop: AttackTroop.fromPrimitives({
        armyId: command.attackerArmy,
        squads: Squads.fromTownSoldiers(command.soldiers).value
      }).toPrimitives(),
      defenderArmyId: defenderArmy.id.toString(),
      sentAt: new Date()
    });
  }

  static attackSentFromAttack(attack: Attack): AttackSentDomainEvent {
    return new AttackSentDomainEvent({
      aggregateId: attack.id.toString(),
      attackerTroop: attack.attackerTroop.toPrimitives(),
      defenderArmyId: attack.defenderArmyId.toString(),
      sentAt: new Date()
    });
  }

  static attackArrivedFor(aggregateId: string) {
    return new AttackArrivedDomainEvent({ aggregateId });
  }
}
