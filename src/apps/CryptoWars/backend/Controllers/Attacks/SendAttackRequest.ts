import { TownSoldiersPrimitives } from '../../../../../Contexts/CryptoWars/Towns/domain/TownSoldiers';

export type SendAttackRequest = {
  attackerArmy: string;
  defenderTown: string;
  soldiers: TownSoldiersPrimitives;
};
