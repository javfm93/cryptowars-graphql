import { Command } from '../../../../Shared/Domain/Command';

export class CreateDirectChatCommand extends Command {
  static COMMAND_NAME = 'CreateDirectChat';

  constructor(readonly id: string, readonly playerOneId: string, readonly playerTwoId: string) {
    super(CreateDirectChatCommand.COMMAND_NAME);
  }
}
