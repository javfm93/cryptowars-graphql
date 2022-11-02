import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  userId: string;
  worldId: string;
};

export class JoinWorldCommand extends Command {
  static COMMAND_NAME = 'JoinWorld';

  userId: string;
  worldId: string;

  constructor({ userId, worldId }: Params) {
    super(JoinWorldCommand.COMMAND_NAME);
    this.userId = userId;
    this.worldId = worldId;
  }
}
