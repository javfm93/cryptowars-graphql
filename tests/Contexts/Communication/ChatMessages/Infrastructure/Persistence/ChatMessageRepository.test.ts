import { ChatMessageGenerator } from '../../Domain/ChatMessageGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { ChatMessageRepository } from '../../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageRepository';
import { DirectChatGenerator } from '../../../Chats/Domain/DirectChatGenerator';

const repository: ChatMessageRepository = container.get(
  'Communication.ChatMessages.ChatMessageRepository'
);

describe('[infra] Chat Message Repository', () => {
  describe('#save', () => {
    it('should save a chat message', async () => {
      const chatMessage = ChatMessageGenerator.random();
      await repository.save(chatMessage);
    });
  });

  describe('#find', () => {
    it('should find the messages of a chat', async () => {
      const chat = DirectChatGenerator.random();
      const expectedChatMessages = ChatMessageGenerator.multipleRandomFor(chat);
      for (const chatMessage of expectedChatMessages.getItems()) {
        await repository.save(chatMessage);
      }

      const chatMessages = await repository.findByDirectChat(chat.id);

      expect(expectedChatMessages).toStrictEqual(chatMessages);
    });
  });
});
