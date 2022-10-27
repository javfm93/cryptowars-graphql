import { Command } from '../../../Shared/Domain/Command';
import { TownSoldiersPrimitives } from '../domain/TownSoldiers';

type Params = {
  townId: string;
  soldiers: TownSoldiersPrimitives;
};

export class TrainSoldiersCommand extends Command {
  static COMMAND_NAME = 'TrainSoldierCommand';

  townId: string;
  soldiers: TownSoldiersPrimitives;

  constructor({ townId, soldiers }: Params) {
    super(TrainSoldiersCommand.COMMAND_NAME);
    this.townId = townId;
    this.soldiers = soldiers;
  }
}
