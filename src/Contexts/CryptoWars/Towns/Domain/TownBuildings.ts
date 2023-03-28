import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { isDeepStrictEqual } from 'util';
import { calculateMsSince, fromMsToHours } from './TimeUtils';
import { basicSoldier, rangeSoldier } from './TownSoldier';
import {
  EssenceGenerator,
  Headquarter,
  TownAssets,
  TownBuildingTypes,
  Warehouse
} from './TownBuilding';

export type TownBuildingsPrimitives = {
  headquarter: Headquarter;
  essenceGenerator: EssenceGenerator;
  warehouse: Warehouse;
};

const HeadQuarterUnits = [basicSoldier, rangeSoldier];

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

  public updateWarehouseAssets(): void {
    const essenceWarehouse = this.value.warehouse.assets.essence;
    const lastEssenceUpdate = essenceWarehouse.lastStorageUpdate;
    const hoursSinceLastUpdate = fromMsToHours(calculateMsSince(new Date(lastEssenceUpdate)));
    const { generationPerHour } = this.value.essenceGenerator;
    const generationSinceLastUpdate = generationPerHour * hoursSinceLastUpdate;
    essenceWarehouse.stored += generationSinceLastUpdate;
    essenceWarehouse.lastStorageUpdate = new Date().toISOString();
  }

  public getTownEssence(): number {
    return this.value.warehouse.assets.essence.stored;
  }

  public payEssence(toPay: number): void {
    this.value.warehouse.assets.essence.stored -= toPay;
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
    type: TownBuildingTypes.creator,
    units: HeadQuarterUnits
  },
  essenceGenerator: {
    level: 1,
    essenceRequiredToLevelUp: 30,
    type: TownBuildingTypes.generator,
    generationPerHour: 60,
    asset: TownAssets.essence
  },
  warehouse: {
    level: 1,
    essenceRequiredToLevelUp: 30,
    type: TownBuildingTypes.store,
    assets: {
      [TownAssets.essence]: {
        name: TownAssets.essence,
        limit: 1000,
        stored: 10,
        lastStorageUpdate: new Date().toISOString()
      }
    }
  }
};
