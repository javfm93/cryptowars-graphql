import { ChatMessage } from './ChatMessage';
import { ChatMessages } from './ChatMessages';
import { DirectChatId } from '../../Chats/Domain/DirectChatId';

export abstract class ChatMessageRepository {
  abstract findByDirectChat(chatId: DirectChatId): Promise<ChatMessages>;

  abstract save(message: ChatMessage): Promise<void>;
}
