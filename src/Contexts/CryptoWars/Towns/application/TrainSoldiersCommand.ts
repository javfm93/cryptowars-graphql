import { Command } from '../../../Shared/Domain/Command';
import { TownSoldiersPrimitives } from '../domain/TownSoldiers';

type Params = {
  playerId: string;
  townId: string;
  soldiers: TownSoldiersPrimitives;
};

export class TrainSoldiersCommand extends Command {
  static COMMAND_NAME = 'TrainSoldierCommand';
  playerId: string;
  townId: string;
  soldiers: TownSoldiersPrimitives;

  constructor({ playerId, townId, soldiers }: Params) {
    super(TrainSoldiersCommand.COMMAND_NAME);
    this.townId = townId;
    this.soldiers = soldiers;
    this.playerId = playerId;
  }
}
