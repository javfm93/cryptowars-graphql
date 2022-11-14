import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { BattleId } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleId';
import { Attack } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/Attack';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { BattleIdGenerator } from './BattleIdGenerator';
import { AttackGenerator } from '../../Attacks/Domain/AttackGenerator';
import { ArmyGenerator } from '../../Armies/domain/ArmyGenerator';

export class BattleGenerator {
  static create(id: BattleId, attack: Attack, defenderArmy: Army): Battle {
    const battle = Battle.create(id, attack, defenderArmy);
    battle.pullDomainEvents();
    return battle;
  }

  static random(): Battle {
    return this.create(
      BattleIdGenerator.random(),
      AttackGenerator.random(),
      ArmyGenerator.random()
    );
  }
}
