import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { SendChatMessageCommand } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Send/SendChatMessageCommand';
import { ChatMessageId } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageId';
import { ChatMessageContent } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageContent';
import { ChatMessageIdGenerator } from '../Domain/ChatMessageIdGenerator';
import { ChatMessageContentGenerator } from '../Domain/ChatMessageContentGenerator';
import { ChatMessage } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessage';

export class SendChatMessageCommandGenerator {
  static create(
    id: ChatMessageId,
    message: ChatMessageContent,
    senderPlayerId: PlayerId,
    chatId: DirectChatId
  ): SendChatMessageCommand {
    return new SendChatMessageCommand(
      id.toString(),
      message.toString(),
      senderPlayerId.toString(),
      chatId.toString()
    );
  }

  static random(): SendChatMessageCommand {
    return this.create(
      ChatMessageIdGenerator.random(),
      ChatMessageContentGenerator.random(),
      PlayerIdGenerator.random(),
      DirectChatId.random()
    );
  }

  static from(chatMessage: ChatMessage): SendChatMessageCommand {
    return this.create(
      chatMessage.id,
      chatMessage.messageContent,
      chatMessage.senderPlayerId,
      chatMessage.chatId
    );
  }
}
