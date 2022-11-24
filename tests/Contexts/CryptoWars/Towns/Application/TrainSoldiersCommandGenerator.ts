import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import { TrainSoldiersCommand } from '../../../../../src/Contexts/CryptoWars/Towns/Application/TrainSoldiers/TrainSoldiersCommand';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { TownIdGenerator } from '../Domain/TownIdGenerator';
import { Town } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/Town';
import { PlayerIdGenerator } from '../../Players/Domain/PlayerIdGenerator';

export class TrainSoldiersCommandGenerator {
  static create(
    playerId: string,
    townId: string,
    soldiers: TownSoldiersPrimitives
  ): TrainSoldiersCommand {
    return new TrainSoldiersCommand({ playerId, townId, soldiers });
  }

  static random(): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = {
      basic: NumberGenerator.randomBetween1and9(),
      range: 0
    };
    return this.create(
      PlayerIdGenerator.random().toString(),
      TownIdGenerator.random().toString(),
      soldiers
    );
  }

  static randomFor(town: Town): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = {
      basic: NumberGenerator.randomBetween1and9(),
      range: 0
    };
    return this.create(town.toPrimitives().playerId, town.id.toString(), soldiers);
  }

  static invalidDueToSoldiersOverCost(town: Town): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = { basic: 99999999999, range: 0 };
    return this.create(town.toPrimitives().playerId, town.id.toString(), soldiers);
  }

  static invalidDueToPlayerNotOwningTheTown(town: Town): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = {
      basic: NumberGenerator.randomBetween1and9(),
      range: 0
    };
    return this.create(PlayerIdGenerator.random().toString(), town.id.toString(), soldiers);
  }

  static invalidDueToNegativeSoldiers(): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = {
      basic: -NumberGenerator.randomBetween1and9(),
      range: 0
    };
    return this.create(
      PlayerIdGenerator.random().toString(),
      TownIdGenerator.random().toString(),
      soldiers
    );
  }

  static invalidDueToNotSupportedSoldiers(): TrainSoldiersCommand {
    const soldiers = { basic: NumberGenerator.randomBetween1and9(), illegal: 3, range: 0 };
    return this.create(
      PlayerIdGenerator.random().toString(),
      TownIdGenerator.random().toString(),
      soldiers
    );
  }
}
