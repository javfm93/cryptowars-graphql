import { WorldGenerator } from '../../Domain/WorldGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { WorldRepository } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';
import { WorldId } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { WorldName } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldName';
import { Worlds } from '../../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';

const repository: WorldRepository = container.get('CryptoWars.Worlds.WorldRepository');

describe('[infra] WorldRepository', () => {
  describe('#findAll', () => {
    it('should return all existent worlds', async () => {
      const expectedWorlds = Worlds.create([
        WorldGenerator.create(
          WorldId.create('93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b'),
          new WorldName('Genesis World')
        )
      ]);

      const worlds = await repository.findAll();

      expect(expectedWorlds).toEqual(worlds);
    });
  });
});
