import { WorldGenerator } from '../../Domain/WorldGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { WorldRepository } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';
import { WorldId } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { WorldName } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldName';
import { Worlds } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';

const repository: WorldRepository = container.get('CryptoWars.Worlds.WorldRepository');

describe('[infra] WorldRepository', () => {
  describe('#save', () => {
    it('should save a world', async () => {
      const word = WorldGenerator.create(
        WorldId.create('93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b'),
        new WorldName('Genesis World')
      );

      await repository.save(word);
    });
  });

  describe('#find', () => {
    it('should find an existent world', async () => {
      const expectedWorld = WorldGenerator.create(
        WorldId.create('93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b'),
        new WorldName('Genesis World')
      );
      await repository.save(expectedWorld);

      const world = await repository.findById(expectedWorld.id);

      expect(expectedWorld).toEqual(world);
    });

    it('should return all existent worlds', async () => {
      const expectedWorlds = Worlds.create([
        WorldGenerator.create(
          WorldId.create('93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b'),
          new WorldName('Genesis World')
        )
      ]);
      await repository.save(expectedWorlds.getItems()[0]);

      const worlds = await repository.findAll();

      expect(expectedWorlds).toEqual(worlds);
    });
  });
});
