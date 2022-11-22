import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import * as faker from 'faker';
import {
  Squads,
  SquadsPrimitives,
  SquadTypes
} from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';

export class SquadsGenerator {
  static create(value: SquadsPrimitives): Squads {
    return Squads.fromPrimitives(value);
  }

  static randomBetween1and9(): Squads {
    return this.create({ [SquadTypes.basic]: NumberGenerator.randomBetween1and9() });
  }

  static randomBetween10and90(): Squads {
    return this.create({
      [SquadTypes.basic]: NumberGenerator.randomBetween10and90()
    });
  }

  static withInvalidNumberOfSoldiers(): Squads {
    return this.create({ [SquadTypes.basic]: -1 });
  }

  static withInvalidSoldiers(): Squads {
    return this.create({ [faker.random.word()]: 1 } as SquadsPrimitives);
  }

  static withLotOfSoldiers(): Squads {
    return this.create({ [SquadTypes.basic]: 9999999999999 });
  }

  static withNSoldiers(soldiers: number): Squads {
    return this.create({ [SquadTypes.basic]: soldiers });
  }
}
