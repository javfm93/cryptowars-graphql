import { ChatMessage } from './ChatMessage';
import { ChatMessages } from './ChatMessages';
import { DirectChatId } from '../../Chats/Domain/DirectChatId';

export interface ChatMessageRepository {
  findByDirectChat(chatId: DirectChatId): Promise<ChatMessages>;

  save(message: ChatMessage): Promise<void>;
}
