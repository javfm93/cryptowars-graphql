import { Command } from '../../../../Shared/Domain/Command';

type Params = {
  userId: string;
  worldId: string;
};

export class SelectWorldCommand extends Command {
  userId: string;
  worldId: string;

  constructor({ userId, worldId }: Params) {
    super();
    this.userId = userId;
    this.worldId = worldId;
  }
}
