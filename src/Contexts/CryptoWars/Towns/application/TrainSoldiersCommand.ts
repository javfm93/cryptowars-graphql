import { Command } from '../../../Shared/Domain/Command';
import { TownSoldiersPrimitives } from '../domain/TownSoldiers';

type Params = {
  townId: string;
  soldiers: TownSoldiersPrimitives;
};

export class TrainSoldiersCommand extends Command {
  townId: string;
  soldiers: TownSoldiersPrimitives;

  constructor({ townId, soldiers }: Params) {
    super();
    this.townId = townId;
    this.soldiers = soldiers;
  }
}
