export enum TownSoldierTypes {
  basic = 'basic',
  range = 'range'
}

export type TownSoldier = {
  name: TownSoldierTypes;
  speed: number;
  capacity: number;
  time: number;
  cost: number;
};

export const basicSoldier: TownSoldier = {
  name: TownSoldierTypes.basic,
  speed: 10,
  capacity: 5,
  time: 1,
  cost: 1
};

export const rangeSoldier: TownSoldier = {
  name: TownSoldierTypes.range,
  speed: 5,
  capacity: 20,
  time: 10,
  cost: 1
};
