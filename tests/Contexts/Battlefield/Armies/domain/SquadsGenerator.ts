import {
  Squads,
  SquadsPrimitives,
  SquadTypes
} from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';
import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';

export class SquadsGenerator {
  static create(squadsPrimitives: SquadsPrimitives): Squads {
    return Squads.fromPrimitives(squadsPrimitives);
  }

  static randomBetween10and90(): Squads {
    return this.create([
      {
        type: SquadTypes.basic,
        soldiers: NumberGenerator.randomBetween10and90()
      }
    ]);
  }
}
