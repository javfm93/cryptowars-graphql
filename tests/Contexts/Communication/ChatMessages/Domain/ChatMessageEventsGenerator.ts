import { ChatMessageSentDomainEvent } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageSentDomainEvent';
import { SendChatMessageCommand } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Send/SendChatMessageCommand';

export class ChatMessageEventsGenerator {
  static sent(command: SendChatMessageCommand): ChatMessageSentDomainEvent {
    return new ChatMessageSentDomainEvent({
      aggregateId: command.id,
      attributes: {
        senderPlayerId: command.senderPlayerId,
        chatId: command.chatId,
        content: command.content
      }
    });
  }
}
