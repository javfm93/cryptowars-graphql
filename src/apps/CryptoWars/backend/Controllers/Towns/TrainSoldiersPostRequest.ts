import { TownSoldiersPrimitives } from '../../../../../Contexts/CryptoWars/Towns/domain/TownSoldiers';

export type TrainSoldiersPostRequest = {
  townId: string;
  soldiers: TownSoldiersPrimitives;
};
