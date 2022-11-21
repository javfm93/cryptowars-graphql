import { TownSoldiersPrimitives } from '../../../../../Contexts/CryptoWars/Towns/Domain/TownSoldiers';

export type SendAttackRequest = {
  attackerArmy: string;
  defenderTown: string;
  soldiers: TownSoldiersPrimitives;
};
