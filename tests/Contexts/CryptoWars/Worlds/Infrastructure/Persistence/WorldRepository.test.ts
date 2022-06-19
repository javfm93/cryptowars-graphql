import { WorldGenerator } from '../../Domain/WorldGenerator';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/Infrastructure/arranger/EnvironmentArranger';
import { InMemoryWorldRepository } from '../../../../../../src/Contexts/CryptoWars/Worlds/Infrastructure/Persistence/InMemoryWorldRepository';

const repository: InMemoryWorldRepository = container.get('CryptoWars.Worlds.WorldRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'CryptoWars.EnvironmentArranger'
);

describe('[infra] WorldRepository', () => {
  beforeEach(async () => {
    await (await environmentArranger).arrange();
    await repository.trunk();
  });

  afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
  });

  describe('#save', () => {
    it('should save a world', async () => {
      const world = WorldGenerator.random();

      await repository.save(world);
    });
  });

  describe('#getAll', () => {
    it('should return all existent worlds', async () => {
      const expectedWorlds = WorldGenerator.multipleRandom();
      // await Promise.all(expectedWorlds.map(repository.save)); // parallel insert not valid in memory
      expectedWorlds.forEach(async world => await repository.save(world));

      const worlds = await repository.getAll();

      expect(worlds).toEqual(expectedWorlds);
    });
  });
});
