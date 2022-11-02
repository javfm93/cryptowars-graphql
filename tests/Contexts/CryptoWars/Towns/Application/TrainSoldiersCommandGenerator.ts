import { NumberGenerator } from '../../../Shared/domain/NumberGenerator';
import { TrainSoldiersCommand } from '../../../../../src/Contexts/CryptoWars/Towns/application/TrainSoldiersCommand';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';
import { TownIdGenerator } from '../domain/TownIdGenerator';
import { Town } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Town';
import { UserIdGenerator } from '../../../IAM/Users/Domain/UserIdGenerator';

export class TrainSoldiersCommandGenerator {
  static create(
    userId: string,
    townId: string,
    soldiers: TownSoldiersPrimitives
  ): TrainSoldiersCommand {
    return new TrainSoldiersCommand({ userId, townId, soldiers });
  }

  static random(): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = { basic: NumberGenerator.randomBetween1and10() };
    return this.create(
      UserIdGenerator.random().toString(),
      TownIdGenerator.random().toString(),
      soldiers
    );
  }

  static randomFor(town: Town): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = { basic: NumberGenerator.randomBetween1and10() };
    return this.create(UserIdGenerator.random().toString(), town.id.toString(), soldiers);
  }

  static invalidDueToNegativeSoldiers(): TrainSoldiersCommand {
    const soldiers: TownSoldiersPrimitives = { basic: -NumberGenerator.randomBetween1and10() };
    return this.create(
      UserIdGenerator.random().toString(),
      TownIdGenerator.random().toString(),
      soldiers
    );
  }

  static invalidDueToNotSupportedSoldiers(): TrainSoldiersCommand {
    const soldiers = { basic: NumberGenerator.randomBetween1and10(), illegal: 3 };
    return this.create(
      UserIdGenerator.random().toString(),
      TownIdGenerator.random().toString(),
      soldiers
    );
  }
}
