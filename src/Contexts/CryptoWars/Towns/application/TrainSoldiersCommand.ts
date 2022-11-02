import { Command } from '../../../Shared/Domain/Command';
import { TownSoldiersPrimitives } from '../domain/TownSoldiers';

type Params = {
  userId: string;
  townId: string;
  soldiers: TownSoldiersPrimitives;
};

export class TrainSoldiersCommand extends Command {
  static COMMAND_NAME = 'TrainSoldierCommand';
  userId: string;
  townId: string;
  soldiers: TownSoldiersPrimitives;

  constructor({ userId, townId, soldiers }: Params) {
    super(TrainSoldiersCommand.COMMAND_NAME);
    this.townId = townId;
    this.soldiers = soldiers;
    this.userId = userId;
  }
}
