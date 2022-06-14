import { VillageGenerator } from '../../domain/VillageGenerator';
import { VillageRepository } from '../../../../../../src/Contexts/CryptoWars/Villages/domain/VillageRepository';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/infrastructure/arranger/EnvironmentArranger';

const repository: VillageRepository = container.get('CryptoWars.Users.UserRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'CryptoWars.EnvironmentArranger'
);

xdescribe('[infra] InMemoryVillageRepository', () => {
  beforeEach(async () => {
    await (await environmentArranger).arrange();
  });

  afterAll(async () => {
    await (await environmentArranger).arrange();
    await (await environmentArranger).close();
  });
  describe('#save', () => {
    it('should save a village', async () => {
      const village = VillageGenerator.random();

      await repository.save(village);
    });
  });

  describe('#search', () => {
    it('should return an existing village', async () => {
      const expectedVillage = VillageGenerator.random();
      await repository.save(expectedVillage);

      const village = await repository.search(expectedVillage.id);

      expect(expectedVillage.toPrimitives()).toEqual(village?.toPrimitives());
    });

    it('should not return a non existing village', async () => {
      expect(await repository.search(VillageGenerator.random().id)).toBeNull();
    });
  });
});
