import { ArmyGenerator } from '../../Domain/ArmyGenerator';
import { ArmyRepository } from '../../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyRepository';
import { Army } from '../../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { DependencyInjector } from '../../../../../../src/apps/CryptoWars/backend/dependency-injection/dependencyInjector';

describe('[infra] ArmyRepository', () => {
  let repository: ArmyRepository;
  beforeAll(async () => {
    const dependencyInjector = await DependencyInjector.initForRepositories();
    repository = dependencyInjector.get(ArmyRepository);
  });

  describe('#save', () => {
    it('should save a army', async () => {
      const army = ArmyGenerator.random();
      await repository.save(army);
    });
  });

  describe('#search', () => {
    let expectedArmy: Army;

    beforeEach(async () => {
      expectedArmy = ArmyGenerator.random();
      await repository.save(expectedArmy);
    });

    it('should return an existing army by Id', async () => {
      const army = await repository.findById(expectedArmy.id);
      expect(army?.toPrimitives()).toEqual(expectedArmy.toPrimitives());
    });

    it('should return an existing army by townId', async () => {
      const army = await repository.findByTownId(expectedArmy.townId);
      expect(army?.toPrimitives()).toEqual(expectedArmy.toPrimitives());
    });

    it('should not return a non existing army', async () => {
      expect(await repository.findById(ArmyGenerator.random().id)).toBeNull();
    });
  });
});
