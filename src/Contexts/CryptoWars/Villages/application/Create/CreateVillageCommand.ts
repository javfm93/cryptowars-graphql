import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  id: string;
};

export class CreateVillageCommand extends Command {
  id: string;

  constructor({ id }: Params) {
    super();
    this.id = id;
  }
}
