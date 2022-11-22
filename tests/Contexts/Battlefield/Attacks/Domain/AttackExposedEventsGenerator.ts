import { SendAttackCommand } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import { AttackSentDomainEvent } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackSentDomainEvent';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { AttackArrivedDomainEvent } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackArrivedDomainEvent';
import { Attack } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/Attack';

export class AttackExposedEventsGenerator {
  static attackSentFrom(command: SendAttackCommand, defenderArmy: Army): AttackSentDomainEvent {
    return new AttackSentDomainEvent({
      aggregateId: command.id,
      attackerTroop: {
        armyId: command.attackerArmy,
        squads: command.soldiers
      },
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
