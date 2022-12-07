import { ChatMessageRepository } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageRepository';
import { ChatMessage } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessage';
import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';
import { ChatMessages } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessages';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';

export class ChatMessagesRepositoryMock implements ChatMessageRepository {
  private mockFindByDirectChat = jest.fn();
  private mockSave = jest.fn();

  findByDirectChat(chatId: DirectChatId): Promise<ChatMessages> {
    return this.mockFindByDirectChat(chatId);
  }

  whenFindByDirectChatThenReturn(chatMessages: ChatMessages): void {
    this.mockFindByDirectChat.mockImplementationOnce(
      (chatId: DirectChatId): NothingOr<ChatMessages> =>
        chatId.isEqualTo(chatMessages.getItems()[0].chatId) ? chatMessages : ChatMessages.create()
    );
  }

  async save(chatMessage: ChatMessage): Promise<void> {
    this.mockSave(chatMessage);
  }

  expectLastSavedChatMessageToBe(chatMessage: ChatMessage): void {
    expect(this.mockSave).toBeCalledWith(chatMessage);
  }
}
