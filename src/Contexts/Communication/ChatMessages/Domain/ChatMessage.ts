import { ChatMessageContent } from './ChatMessageContent';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { ChatMessageId } from './ChatMessageId';
import { DirectChatId } from '../../Chats/Domain/DirectChatId';
import { ChatMessageSentDomainEvent } from './ChatMessageSentDomainEvent';

export enum MessageStatuses {
  'sent' = 'sent',
  'notified' = 'notified',
  'received' = 'received',
  'opened' = 'opened'
}

export class ChatMessage extends AggregateRoot {
  protected constructor(
    id: ChatMessageId,
    readonly messageContent: ChatMessageContent,
    readonly senderPlayerId: PlayerId,
    readonly chatId: DirectChatId,
    readonly createdAt: Date = new Date(),
    public status: MessageStatuses = MessageStatuses.sent,
    readonly order: number = -1
  ) {
    super(id);
  }

  public static create(
    id: ChatMessageId,
    messageContent: ChatMessageContent,
    senderPlayerId: PlayerId,
    chatId: DirectChatId
  ): ChatMessage {
    const chatMessage = new ChatMessage(id, messageContent, senderPlayerId, chatId);
    chatMessage.record(
      new ChatMessageSentDomainEvent({
        aggregateId: id.toString(),
        attributes: {
          senderPlayerId: senderPlayerId.toString(),
          chatId: chatId.toString(),
          content: messageContent.toString()
        }
      })
    );
    return chatMessage;
  }

  toPrimitives(): Primitives<ChatMessage> {
    return {
      id: this.id.toString(),
      messageContent: this.messageContent.toString(),
      senderPlayerId: this.senderPlayerId.toString(),
      chatId: this.chatId.toString(),
      createdAt: this.createdAt,
      status: this.status,
      order: this.order
    };
  }

  static fromPrimitives(plainData: Primitives<ChatMessage>): ChatMessage {
    const id = ChatMessageId.create(plainData.id);
    const messageContent = ChatMessageContent.create(plainData.messageContent);
    const senderPlayerId = PlayerId.create(plainData.senderPlayerId);
    const chatId = DirectChatId.create(plainData.chatId);
    const createdAt = new Date(plainData.createdAt);
    const status = plainData.status;
    const order = plainData.order;
    return new ChatMessage(id, messageContent, senderPlayerId, chatId, createdAt, status, order);
  }
}
