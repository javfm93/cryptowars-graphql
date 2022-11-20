import { AttackIdGenerator } from './AttackIdGenerator';
import { Attack } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/Attack';
import { AttackId } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackId';
import { AttackTroop } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackTroop';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownSoldiersGenerator } from './TownSoldiersGenerator';
import { ArmyIdGenerator } from '../../Armies/domain/ArmyIdGenerator';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';

export class AttackGenerator {
  static create(
    id: AttackId,
    attackerTroop: AttackTroop,
    defenderArmyId: ArmyId,
    sentAt: string
  ): Attack {
    return Attack.fromPrimitives({
      id: id.toString(),
      attackerTroop: attackerTroop.toPrimitives(),
      defenderArmyId: defenderArmyId.toString(),
      sentAt
    });
  }

  static randomFromAttacker(attacker: ArmyId): Attack {
    return this.create(
      AttackIdGenerator.random(),
      AttackTroop.create(attacker.toString(), TownSoldiersGenerator.random().value),
      ArmyIdGenerator.random(),
      new Date().toISOString()
    );
  }

  static randomToDefender(defenderArmy: Army): Attack {
    return this.create(
      AttackIdGenerator.random(),
      AttackTroop.create(ArmyIdGenerator.random().toString(), TownSoldiersGenerator.random().value),
      defenderArmy.id,
      new Date().toISOString()
    );
  }

  static toDefenderWithNSoldiers(defenderArmy: Army, soldiers: number): Attack {
    return this.create(
      AttackIdGenerator.random(),
      AttackTroop.create(
        ArmyIdGenerator.random().toString(),
        TownSoldiersGenerator.withNSoldiers(soldiers).value
      ),
      defenderArmy.id,
      new Date().toISOString()
    );
  }

  static random(): Attack {
    return this.create(
      AttackIdGenerator.random(),
      AttackTroop.create(ArmyIdGenerator.random().toString(), TownSoldiersGenerator.random().value),
      ArmyIdGenerator.random(),
      new Date().toISOString()
    );
  }
}
