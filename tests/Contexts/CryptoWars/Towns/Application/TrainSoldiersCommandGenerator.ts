import { NumberGenerator } from '../../../Shared/domain/NumberGenerator';

export class TrainSoldiersCommandGenerator {
  static create(numberOfSoldiers: number): TrainSoldierCommand {
    return new TrainSoldierCommand({ soldiers: numberOfSoldiers });
  }

  static random(): TrainSoldierCommand {
    return this.create(NumberGenerator.randomBetween1and10());
  }
}
