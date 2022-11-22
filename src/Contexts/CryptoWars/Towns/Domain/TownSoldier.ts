export enum TownSoldierTypes {
  basic = 'basic'
}

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
