import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';
import { ChatMessageId } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageId';

export class ChatMessageIdGenerator {
  static create(value: string): ChatMessageId {
    return DirectChatId.create(value);
  }

  static random(): ChatMessageId {
    return this.create(UuidGenerator.random().toString());
  }
}
