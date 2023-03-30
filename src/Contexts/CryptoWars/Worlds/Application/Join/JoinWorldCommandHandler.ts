import { JoinWorldCommand } from './JoinWorldCommand';
import { JoinWorld, JoinWorldResultErrors } from './JoinWorld';
import { Result, Nothing } from '../../../../Shared/Aplication/Result';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { WorldId } from '../../Domain/WorldId';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { CommandHandler, RegisterCommandHandler } from '../../../../Shared/Domain/CommandHandler';

export type JoinWorldCommandResultErrors = JoinWorldResultErrors;
export type JoinWorldCommandResult = Result<Nothing, JoinWorldCommandResultErrors>;

@RegisterCommandHandler()
export class JoinWorldCommandHandler implements CommandHandler<JoinWorldCommand> {
  constructor(private joinWorld: JoinWorld) {}

  subscribedTo(): CommandClass {
    return JoinWorldCommand;
  }

  async handle(command: JoinWorldCommand): Promise<JoinWorldCommandResult> {
    const worldId = WorldId.create(command.worldId);
    const userId = UserId.create(command.userId);
    return this.joinWorld.execute({ worldId, userId });
  }
}
