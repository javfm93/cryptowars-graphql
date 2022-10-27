import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  userId: string;
  worldId: string;
};

export class SelectWorldCommand extends Command {
  static COMMAND_NAME = 'SelectWorld';

  userId: string;
  worldId: string;

  constructor({ userId, worldId }: Params) {
    super(SelectWorldCommand.COMMAND_NAME);
    this.userId = userId;
    this.worldId = worldId;
  }
}
