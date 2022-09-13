import { TownGenerator } from '../../domain/TownGenerator';
import { TownRepository } from '../../../../../../src/Contexts/CryptoWars/Towns/domain/TownRepository';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/Infrastructure/arranger/EnvironmentArranger';

const repository: TownRepository = container.get('CryptoWars.Towns.TownRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'CryptoWars.EnvironmentArranger'
);

xdescribe('[infra] InMemoryTownRepository', () => {
  beforeEach(async () => {
    await (await environmentArranger).arrange();
  });

  afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
  });
  describe('#save', () => {
    it('should save a town', async () => {
      const town = TownGenerator.random();

      await repository.save(town);
    });
  });

  describe('#search', () => {
    it('should find an existing town by townId', async () => {
      const expectedTown = TownGenerator.random();
      await repository.save(expectedTown);

      const town = await repository.findById(expectedTown.id);

      expect(expectedTown.toPrimitives()).toEqual(town?.toPrimitives());
    });

    it('should not return a non existing town', async () => {
      expect(await repository.findById(TownGenerator.random().id)).toBeNull();
    });
  });
});
