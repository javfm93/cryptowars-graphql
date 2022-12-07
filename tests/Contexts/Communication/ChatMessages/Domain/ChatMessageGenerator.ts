import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';
import {
  ChatMessage,
  MessageStatuses
} from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessage';
import { ChatMessages } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessages';
import { ChatMessageId } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageId';
import { ChatMessageContent } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageContent';
import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';
import { ChatMessageIdGenerator } from './ChatMessageIdGenerator';
import { ChatMessageContentGenerator } from './ChatMessageContentGenerator';
import { DirectChat } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChat';

export class ChatMessageGenerator {
  static create(
    chatMessageId: ChatMessageId,
    messageContent: ChatMessageContent,
    senderPlayerId: PlayerId,
    chatId: DirectChatId,
    createdAt = new Date(),
    status = MessageStatuses.sent,
    order = -1
  ): ChatMessage {
    return ChatMessage.fromPrimitives({
      id: chatMessageId.toString(),
      messageContent: messageContent.toString(),
      senderPlayerId: senderPlayerId.toString(),
      chatId: chatId.toString(),
      createdAt,
      status,
      order
    });
  }

  static random(): ChatMessage {
    const chatMessageId = ChatMessageIdGenerator.random();
    const messageContent = ChatMessageContentGenerator.random();
    const senderPlayerId = PlayerIdGenerator.random();
    const chatId = DirectChatId.random();
    return this.create(chatMessageId, messageContent, senderPlayerId, chatId);
  }

  static multipleRandom(): ChatMessages {
    const chatMessages = Array.from({ length: NumberGenerator.randomBetween1and9() }, () =>
      this.random()
    );
    return ChatMessages.create(chatMessages);
  }

  static randomFor(chat: DirectChat): ChatMessage {
    const chatMessageId = ChatMessageIdGenerator.random();
    const messageContent = ChatMessageContentGenerator.random();
    return this.create(chatMessageId, messageContent, chat.playerOneId, chat.id);
  }

  static multipleRandomFor(chat: DirectChat): ChatMessages {
    const chatMessages = Array.from({ length: NumberGenerator.randomBetween1and9() }, () =>
      this.randomFor(chat)
    );
    return ChatMessages.create(chatMessages);
  }
}
