import { TownSoldier } from './TownSoldier';

export enum TownBuildingTypes {
  generator = 'generator',
  creator = 'creator',
  store = 'store'
}

type TownBuilding = {
  level: number;
  essenceRequiredToLevelUp: number;
  type: TownBuildingTypes;
};

export type Headquarter = TownBuilding & {
  units: Array<TownSoldier>;
};

export type EssenceGenerator = TownBuilding & {
  asset: TownAssets;
  generationPerHour: number;
};

export type Warehouse = TownBuilding & {
  assets: WarehouseAssets;
};

export type WarehouseAssets = {
  [key in TownAssets]: {
    name: TownAssets;
    limit: number;
    stored: number;
    lastStorageUpdate: string;
  };
};

export enum TownAssets {
  'essence' = 'essence'
}
