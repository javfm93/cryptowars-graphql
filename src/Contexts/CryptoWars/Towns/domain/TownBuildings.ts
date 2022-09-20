import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { isDeepStrictEqual } from 'util';

export interface TownBuildingsPrimitives {
  headquarter: {
    level: number;
    essenceRequiredToLevelUp: number;
  };
  essenceGenerator: {
    level: number;
    essenceRequiredToLevelUp: number;
  };
}

export class TownBuildings extends ValueObject<TownBuildings> {
  private constructor(readonly value: TownBuildingsPrimitives) {
    super();
    this.value = value;
  }

  public static createInitialBuildings(): TownBuildings {
    const initialBuildings = {
      essenceGenerator: { essenceRequiredToLevelUp: 30, level: 1 },
      headquarter: { essenceRequiredToLevelUp: 10, level: 0 }
    };

    return new TownBuildings(initialBuildings);
  }

  public static fromPrimitives(value: TownBuildingsPrimitives): TownBuildings {
    return new TownBuildings(value);
  }

  public isEqualTo(townBuildings?: TownBuildings) {
    return isDeepStrictEqual(this.value, townBuildings?.value);
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}
