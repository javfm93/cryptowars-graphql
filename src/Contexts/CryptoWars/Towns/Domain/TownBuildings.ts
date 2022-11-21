import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { isDeepStrictEqual } from 'util';
import { basicSoldier, TownSoldier } from './TownSoldiers';
import { calculateMsSince, fromMsToHours } from './TimeUtils';

export enum TownBuildingType {
  generator = 'generator',
  creator = 'creator',
  store = 'store'
}

export enum TownAssets {
  'essence' = 'essence'
}

export interface TownBuildingsPrimitives {
  headquarter: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    units: Array<TownSoldier>;
  };
  essenceGenerator: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    asset: TownAssets;
    generationPerHour: number;
  };
  warehouse: {
    level: number;
    essenceRequiredToLevelUp: number;
    type: TownBuildingType;
    // todo: refactor this to a map
    assets: [
      {
        name: TownAssets;
        limit: number;
        stored: number;
        lastStorageUpdate: string;
      }
    ];
  };
}

const HeadQuarterUnits = [basicSoldier];

export class TownBuildings extends ValueObject<TownBuildings> {
  private constructor(readonly value: TownBuildingsPrimitives) {
    super();
    this.value = value;
  }

  public static createInitialBuildings(): TownBuildings {
    return new TownBuildings(initialBuildings);
  }

  public static fromPrimitives(value: TownBuildingsPrimitives): TownBuildings {
    return new TownBuildings(value);
  }

  public updateWareHouseAssets(): void {
    const essenceWarehouse = this.value.warehouse.assets[0];
    const lastEssenceUpdate = essenceWarehouse.lastStorageUpdate;
    const hoursSinceLastUpdate = fromMsToHours(calculateMsSince(new Date(lastEssenceUpdate)));
    const { generationPerHour } = this.value.essenceGenerator;
    const generationSinceLastUpdate = generationPerHour * hoursSinceLastUpdate;
    const lastEssenceRegistry = essenceWarehouse.stored;
    this.value.warehouse.assets[0].stored = lastEssenceRegistry + generationSinceLastUpdate;
    this.value.warehouse.assets[0].lastStorageUpdate = new Date().toISOString();
  }

  public getTownEssence(): number {
    return this.value.warehouse.assets[0].stored;
  }

  public payEssence(toPay: number): void {
    this.value.warehouse.assets[0].stored -= toPay;
  }

  public isEqualTo(townBuildings?: TownBuildings) {
    return isDeepStrictEqual(this.value, townBuildings?.value);
  }

  public toString(): string {
    return JSON.stringify(this.value);
  }
}

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
    asset: TownAssets.essence
  },
  warehouse: {
    level: 1,
    essenceRequiredToLevelUp: 30,
    type: TownBuildingType.store,
    assets: [
      {
        name: TownAssets.essence,
        limit: 1000,
        stored: 10,
        lastStorageUpdate: new Date().toISOString()
      }
    ]
  }
};
