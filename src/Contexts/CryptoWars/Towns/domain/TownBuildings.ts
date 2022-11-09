import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { isDeepStrictEqual } from 'util';

export enum TownBuildingType {
  generator = 'generator',
  creator = 'creator'
}

export enum TownUnits {
  basic = 'basic'
}

export const HeadQuarterUnits = [TownUnits.basic];

export enum TownResources {
  'essence' = 'essence'
}

export interface TownBuildingsPrimitives {
  headquarter: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    units: typeof HeadQuarterUnits;
  };
  essenceGenerator: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    resource: TownResources;
    generationPerHour: number;
  };
}

export class TownBuildings extends ValueObject<TownBuildings> {
  private constructor(readonly value: TownBuildingsPrimitives) {
    super();
    this.value = value;
  }

  public static createInitialBuildings(): TownBuildings {
    const initialBuildings: TownBuildingsPrimitives = {
      headquarter: {
        level: 0,
        essenceRequiredToLevelUp: 10,
        type: TownBuildingType.creator,
        units: HeadQuarterUnits
      },
      essenceGenerator: {
        level: 1,
        essenceRequiredToLevelUp: 30,
        type: TownBuildingType.generator,
        generationPerHour: 60,
        resource: TownResources.essence
      }
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
