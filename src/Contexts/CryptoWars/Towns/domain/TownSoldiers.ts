import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { InvalidNumberOfSoldiers } from './InvalidNumberOfSoldiers';
import { InvalidSoldier } from './InvalidSoldier';

export enum TownSoldierTypes {
  basic = 'basic'
}

export type TownSoldiersPrimitives = {
  [key in TownSoldierTypes]: number;
};

export type TownSoldier = {
  name: TownSoldierTypes;
  attack: number;
  defense: number;
  cost: number;
};

export const basicSoldier: TownSoldier = {
  name: TownSoldierTypes.basic,
  attack: 10,
  defense: 5,
  cost: 1
};

export class TownSoldiers extends ValueObject<TownSoldiers> {
  private constructor(readonly value: TownSoldiersPrimitives) {
    super();
  }

  public static create(
    soldiers: TownSoldiersPrimitives
  ): Either<TownSoldiers, InvalidSoldier | InvalidNumberOfSoldiers> {
    if (!soldiers) return failure(new InvalidNumberOfSoldiers());
    const soldiersToCreate = Object.entries(soldiers);
    for (const soldierToCreate of soldiersToCreate) {
      const [soldier, numberOfSoldiers] = soldierToCreate;
      if (!Object.keys(TownSoldierTypes).includes(soldier)) {
        return failure(new InvalidSoldier(soldier));
      }
      if (numberOfSoldiers < 1) {
        return failure(new InvalidNumberOfSoldiers());
      }
    }

    return successAndReturn(new TownSoldiers(soldiers));
  }

  public calculateCost(): number {
    return this.value[TownSoldierTypes.basic] * basicSoldier.cost;
  }

  public static fromPrimitives(soldiers: TownSoldiersPrimitives): TownSoldiers {
    return new TownSoldiers(soldiers);
  }

  public isEqualTo(soldiers?: TownSoldiers) {
    return this.toString() === soldiers?.toString();
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}
