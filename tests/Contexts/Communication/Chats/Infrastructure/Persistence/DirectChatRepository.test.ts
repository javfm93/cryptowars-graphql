import { DirectChatGenerator } from '../../Domain/DirectChatGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { DirectChatRepository } from '../../../../../../src/Contexts/Communication/Chats/Domain/DirectChatRepository';
import { PlayerIdGenerator } from '../../../../CryptoWars/Players/domain/PlayerIdGenerator';

const repository: DirectChatRepository = container.get('Communication.Chats.DirectChatRepository');

describe('[infra] Direct Chat Repository', () => {
  describe('#save', () => {
    it('should save a direct chat', async () => {
      const directChat = DirectChatGenerator.random();
      await repository.save(directChat);
    });
  });

  describe('#find', () => {
    it('should find the directChats of a player', async () => {
      const playerId = PlayerIdGenerator.random();
      const expectedDirectChats = DirectChatGenerator.multipleRandomFor(playerId);
      for (const directChat of expectedDirectChats.getItems()) {
        await repository.save(directChat);
      }

      const directChats = await repository.findDirectChatsOf(playerId);

      expect(expectedDirectChats).toStrictEqual(directChats);
    });

    it('should return a chat between two players', async () => {
      const expectedDirectChat = DirectChatGenerator.random();
      await repository.save(expectedDirectChat);

      const directChat = await repository.findDirectChatBetween(
        expectedDirectChat.playerOneId,
        expectedDirectChat.playerTwoId
      );
      const directChatInverse = await repository.findDirectChatBetween(
        expectedDirectChat.playerTwoId,
        expectedDirectChat.playerOneId
      );

      expect(expectedDirectChat).toStrictEqual(directChat);
      expect(directChatInverse).toStrictEqual(directChat);
    });
  });
});
