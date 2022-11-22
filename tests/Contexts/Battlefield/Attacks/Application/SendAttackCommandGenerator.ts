import { SquadsGenerator } from '../../Armies/domain/SquadsGenerator';
import { SendAttackCommand } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { AttackId } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackId';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { AttackIdGenerator } from '../Domain/AttackIdGenerator';
import { ArmyIdGenerator } from '../../Armies/Domain/ArmyIdGenerator';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/Domain/PlayerIdGenerator';
import { Squads } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';

export class SendAttackCommandGenerator {
  static create(
    id: AttackId,
    attackerArmy: ArmyId,
    defenderTown: TownId,
    soldiers: Squads,
    playerId: PlayerId
  ): SendAttackCommand {
    return new SendAttackCommand({
      id: id.toString(),
      attackerArmy: attackerArmy.toString(),
      defenderTown: defenderTown.toString(),
      soldiers: soldiers.value,
      playerId: playerId.toString()
    });
  }

  static random(): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      ArmyIdGenerator.random(),
      ArmyIdGenerator.random(),
      SquadsGenerator.randomBetween1and9(),
      PlayerIdGenerator.random()
    );
  }

  static betweenArmies(attackerArmy: Army, defenderArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      attackerArmy.id,
      defenderArmy.townId,
      SquadsGenerator.randomBetween1and9(),
      attackerArmy.playerId
    );
  }

  static fromArmyWithDifferentPlayer(attackerArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      attackerArmy.id,
      ArmyIdGenerator.random(),
      SquadsGenerator.randomBetween1and9(),
      PlayerIdGenerator.random()
    );
  }

  static withMoreSoldiersThantTheArmy(attackerArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      attackerArmy.id,
      ArmyIdGenerator.random(),
      SquadsGenerator.withLotOfSoldiers(),
      attackerArmy.playerId
    );
  }

  static withInvalidNumberOfSoldiersFor(): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      ArmyIdGenerator.random(),
      ArmyIdGenerator.random(),
      SquadsGenerator.withInvalidNumberOfSoldiers(),
      PlayerIdGenerator.random()
    );
  }

  static withInvalidSoldiersFor(attackerArmy: Army, defenderArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      ArmyIdGenerator.random(),
      ArmyIdGenerator.random(),
      SquadsGenerator.withInvalidSoldiers(),
      PlayerIdGenerator.random()
    );
  }
}
