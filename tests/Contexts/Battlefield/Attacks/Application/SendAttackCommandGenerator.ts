import { TownSoldiersGenerator } from '../Domain/TownSoldiersGenerator';
import { SendAttackCommand } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import { TownSoldiers } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { AttackId } from '../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackId';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { AttackIdGenerator } from '../Domain/AttackIdGenerator';
import { ArmyIdGenerator } from '../../Armies/domain/ArmyIdGenerator';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';

export class SendAttackCommandGenerator {
  static create(
    id: AttackId,
    attackerArmy: ArmyId,
    defenderTown: TownId,
    soldiers: TownSoldiers,
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
      TownSoldiersGenerator.random(),
      PlayerIdGenerator.random()
    );
  }

  static betweenArmies(attackerArmy: Army, defenderArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      attackerArmy.id,
      defenderArmy.townId,
      TownSoldiersGenerator.random(),
      attackerArmy.playerId
    );
  }

  static fromArmyWithDifferentPlayer(attackerArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      attackerArmy.id,
      ArmyIdGenerator.random(),
      TownSoldiersGenerator.random(),
      PlayerIdGenerator.random()
    );
  }

  static withInvalidNumberOfSoldiersFor(): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      ArmyIdGenerator.random(),
      ArmyIdGenerator.random(),
      TownSoldiersGenerator.withInvalidNumberOfSoldiers(),
      PlayerIdGenerator.random()
    );
  }

  static withInvalidSoldiersFor(attackerArmy: Army, defenderArmy: Army): SendAttackCommand {
    return this.create(
      AttackIdGenerator.random(),
      ArmyIdGenerator.random(),
      ArmyIdGenerator.random(),
      TownSoldiersGenerator.withInvalidSoldiers(),
      PlayerIdGenerator.random()
    );
  }
}
