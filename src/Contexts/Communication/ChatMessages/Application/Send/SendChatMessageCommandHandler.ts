import { SendChatMessageCommand } from './SendChatMessageCommand';
import { SendChatMessage } from './SendChatMessage';
import { Result, Nothing } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { CommandHandler, RegisterCommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ChatMessageContent } from '../../Domain/ChatMessageContent';
import { ChatMessageId } from '../../Domain/ChatMessageId';
import { DirectChatId } from '../../../Chats/Domain/DirectChatId';

export type SendMessageCommandResult = Result<Nothing, DomainError>;

@RegisterCommandHandler()
export class SendChatMessageCommandHandler implements CommandHandler<SendChatMessageCommand> {
  constructor(private sendMessage: SendChatMessage) {}

  subscribedTo(): CommandClass {
    return SendChatMessageCommand;
  }

  async handle(command: SendChatMessageCommand): Promise<SendMessageCommandResult> {
    const id = ChatMessageId.create(command.id);
    const messageContent = ChatMessageContent.create(command.content);
    const senderPlayerId = PlayerId.create(command.senderPlayerId);
    const chatId = DirectChatId.create(command.chatId);
    return this.sendMessage.execute({ id, messageContent, senderPlayerId, chatId });
  }
}
