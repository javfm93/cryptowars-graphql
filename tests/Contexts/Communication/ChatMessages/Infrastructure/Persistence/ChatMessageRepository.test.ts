import { ChatMessageGenerator } from '../../Domain/ChatMessageGenerator';
import { ChatMessageRepository } from '../../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageRepository';
import { DirectChatGenerator } from '../../../Chats/Domain/DirectChatGenerator';
import { DependencyInjector } from '../../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';

describe('[infra] Chat Message Repository', () => {
  let repository: ChatMessageRepository;
  beforeAll(async () => {
    const dependencyInjector = await DependencyInjector.initForRepositories();
    repository = dependencyInjector.get(ChatMessageRepository);
  });

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
