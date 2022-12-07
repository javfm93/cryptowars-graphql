import { Command } from '../../../../Shared/Domain/Command';

export class SendChatMessageCommand extends Command {
  static COMMAND_NAME = 'SendMessage';

  constructor(
    readonly id: string,
    readonly content: string,
    readonly senderPlayerId: string,
    readonly chatId: string
  ) {
    super(SendChatMessageCommand.COMMAND_NAME);
  }
}
