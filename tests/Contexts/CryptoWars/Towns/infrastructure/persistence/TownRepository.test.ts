import { TownGenerator } from '../../Domain/TownGenerator';
import { TownRepository } from '../../../../../../src/Contexts/CryptoWars/Towns/Domain/TownRepository';
import { PlayerGenerator } from '../../../Players/Domain/PlayerGenerator';
import { Player } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { WorldGenerator } from '../../../Worlds/Domain/WorldGenerator';
import { WorldRepository } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';
import { World } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { Players } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Players';
import { DependencyInjector } from '../../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';

describe('[infra] TownRepository', () => {
  let player: Player;
  let world: World;
  let repository: TownRepository;
  let worldRepository: WorldRepository;

  beforeAll(async () => {
    const dependencyInjector = await DependencyInjector.initForRepositories();
    repository = dependencyInjector.get(TownRepository);
    worldRepository = dependencyInjector.get(WorldRepository);
  });

  beforeEach(async () => {
    player = PlayerGenerator.random();
    world = WorldGenerator.withPlayers(Players.create([player]));
    await worldRepository.save(world);
  });

  describe('#save', () => {
    it('should save a town', async () => {
      const town = TownGenerator.randomFor(player.id, world.id);

      await repository.save(town);
    });
  });

  describe('#search', () => {
    it('should find an existing town by townId', async () => {
      const expectedTown = TownGenerator.randomFor(player.id, world.id);
      await repository.save(expectedTown);

      const town = await repository.findById(expectedTown.id);

      expect(town?.toPrimitives()).toEqual(expectedTown.toPrimitives());
    });

    it('should not return a non existing town', async () => {
      expect(await repository.findById(TownGenerator.random().id)).toBeNull();
    });
  });
});
