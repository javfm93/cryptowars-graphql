import { TownGenerator } from '../../domain/TownGenerator';
import { TownRepository } from '../../../../../../src/Contexts/CryptoWars/Towns/domain/TownRepository';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { PlayerRepository } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerRepository';
import { PlayerGenerator } from '../../../Players/domain/PlayerGenerator';
import { Player } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';

const repository: TownRepository = container.get('CryptoWars.Towns.TownRepository');
const playerRepository: PlayerRepository = container.get('CryptoWars.Players.PlayerRepository');

describe('[infra] TownRepository', () => {
  let player: Player;

  beforeEach(async () => {
    player = PlayerGenerator.withoutTowns();
    await playerRepository.save(player);
  });

  describe('#save', () => {
    it('should save a town', async () => {
      const town = TownGenerator.randomFor(player.id);

      await repository.save(town);
    });
  });

  describe('#search', () => {
    it('should find an existing town by townId', async () => {
      const expectedTown = TownGenerator.randomFor(player.id);
      await repository.save(expectedTown);

      const town = await repository.findById(expectedTown.id);

      expect(town?.toPrimitives()).toEqual(expectedTown.toPrimitives());
    });

    it('should not return a non existing town', async () => {
      expect(await repository.findById(TownGenerator.random().id)).toBeNull();
    });
  });
});
