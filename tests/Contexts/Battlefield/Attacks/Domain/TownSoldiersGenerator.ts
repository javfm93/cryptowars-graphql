import {
  TownSoldiers,
  TownSoldiersPrimitives,
  TownSoldierTypes
} from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';
import {NumberGenerator} from '../../../Shared/Domain/NumberGenerator';
import * as faker from 'faker';

// todo: this is taking an structure from other bounded context
export class TownSoldiersGenerator {
  static create(value: TownSoldiersPrimitives): TownSoldiers {
    return TownSoldiers.fromPrimitives(value);
  }

  static random(): TownSoldiers {
    return this.create({ [TownSoldierTypes.basic]: NumberGenerator.randomBetween1and9() });
  }

  static withInvalidNumberOfSoldiers(): TownSoldiers {
    return this.create({ [TownSoldierTypes.basic]: -1 });
  }

  static withInvalidSoldiers(): TownSoldiers {
    return this.create({ [faker.random.word()]: -1 } as TownSoldiersPrimitives);
  }
}
