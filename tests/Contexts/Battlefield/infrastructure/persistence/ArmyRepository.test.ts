import { PlayerGenerator } from '../../domain/PlayerGenerator';
import { PlayerRepository } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerRepository';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { Player } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';

const repository: PlayerRepository = container.get('CryptoWars.Players.PlayerRepository');

describe('[infra] PlayerRepository', () => {
  describe('#save', () => {
    it('should save a player', async () => {
      const player = PlayerGenerator.random();
      await repository.save(player);
    });
  });

  describe('#search', () => {
    let expectedPlayer: Player;

    beforeEach(async () => {
      expectedPlayer = PlayerGenerator.withWorldsAndTowns();
      await repository.save(expectedPlayer);
    });

    it('should return an existing player by Id', async () => {
      const player = await repository.findById(expectedPlayer.id);
      expect(player?.toPrimitives()).toEqual(expectedPlayer.toPrimitives());
    });

    it('should return an existing player by userId', async () => {
      const player = await repository.findByUserId(expectedPlayer.userId);
      expect(player?.toPrimitives()).toEqual(expectedPlayer.toPrimitives());
    });

    it('should not return a non existing player', async () => {
      expect(await repository.findById(PlayerGenerator.random().id)).toBeNull();
    });
  });
});
