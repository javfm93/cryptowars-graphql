import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { isDeepStrictEqual } from 'util';

export enum TownBuildingType {
  generator = 'generator',
  creator = 'creator',
  store = 'store'
}

export enum TownUnits {
  basic = 'basic'
}

export type TownUnit = {
  name: TownUnits;
  attack: number;
  defense: number;
  cost: number;
};

const basicUnit: TownUnit = {
  name: TownUnits.basic,
  attack: 10,
  defense: 5,
  cost: 30
};

export const HeadQuarterUnits = [basicUnit];

export enum TownResources {
  'essence' = 'essence'
}

export interface TownBuildingsPrimitives {
  headquarter: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    units: Array<TownUnit>;
  };
  essenceGenerator: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    resource: TownResources;
    generationPerHour: number;
  };
  warehouse: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    assets: [
      {
        name: TownResources;
        limit: number;
        stored: number;
        lastStorageUpdate: string;
      }
    ];
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
      },
      warehouse: {
        level: 1,
        essenceRequiredToLevelUp: 30,
        type: TownBuildingType.store,
        assets: [
          {
            name: TownResources.essence,
            limit: 1000,
            stored: 10,
            lastStorageUpdate: new Date().toISOString()
          }
        ]
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
