import { Command } from '../../../../Shared/Domain/Command';
import { SquadsPrimitives } from '../../../Armies/Domain/Squads';

type Params = {
  id: string;
  defenderTown: string;
  attackerArmy: string;
  soldiers: SquadsPrimitives;
  playerId: string;
};

export class SendAttackCommand extends Command {
  static COMMAND_NAME = 'SendAttack';

  id: string;
  attackerArmy: string;
  defenderTown: string;
  soldiers: SquadsPrimitives;
  playerId: string;

  constructor({ id, attackerArmy, defenderTown, soldiers, playerId }: Params) {
    super(SendAttackCommand.COMMAND_NAME);
    this.id = id;
    this.attackerArmy = attackerArmy;
    this.defenderTown = defenderTown;
    this.soldiers = soldiers;
    this.playerId = playerId;
  }
}
