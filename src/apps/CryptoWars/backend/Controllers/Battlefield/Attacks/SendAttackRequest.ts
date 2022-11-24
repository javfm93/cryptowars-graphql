import { SquadsPrimitives } from '../../../../../../Contexts/Battlefield/Armies/Domain/Squads';

export type SendAttackRequest = {
  attackerArmy: string;
  defenderTown: string;
  soldiers: SquadsPrimitives;
};
