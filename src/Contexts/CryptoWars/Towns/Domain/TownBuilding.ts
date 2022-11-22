import { TownSoldier } from './TownSoldier';

export enum TownBuildingType {
  generator = 'generator',
  creator = 'creator',
  store = 'store'
}

type TownBuilding = {
  level: number;
  essenceRequiredToLevelUp: number;
  type: TownBuildingType;
};

export type Headquarter = TownBuilding & {
  units: Array<TownSoldier>;
};

export type EssenceGenerator = TownBuilding & {
  asset: TownAssets;
  generationPerHour: number;
};

export type Warehouse = TownBuilding & {
  assets: Assets;
};

type Assets = {
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
