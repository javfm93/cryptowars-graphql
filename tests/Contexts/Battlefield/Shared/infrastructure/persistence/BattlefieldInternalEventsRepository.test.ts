import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { BattlefieldInternalEventRepository } from '../../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyExposedEventsGenerator } from '../../../Army/domain/ArmyExposedEventsGenerator';
import { ArmyGenerator } from '../../../Army/domain/ArmyGenerator';
import { BattlefieldInternalEvent } from '../../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../../../../src/Contexts/Shared/Domain/value-object/Uuid';

import { Army } from '../../../../../../src/Contexts/Battlefield/Armies/Domain/Army';

const repository: BattlefieldInternalEventRepository = container.get(
  'Battlefield.Shared.BattlefieldInternalEventRepository'
);

describe('[infra] BattlefieldInternalEventRepository', () => {
  describe('#save', () => {
    it('should save multiple battlefield event', async () => {
      const army = ArmyGenerator.random();
      const armyCreated = ArmyExposedEventsGenerator.ArmyCreated(army).toBattlefieldInternalEvent();
      const soldiersRecruited = ArmyExposedEventsGenerator.SoldiersRecruited(
        army.id,
        army.townId,
        army.basicSquad
      ).toBattlefieldInternalEvent();
      await repository.save([armyCreated, soldiersRecruited]);
    });
  });

  describe('#search', () => {
    let expectedArmyCreated: BattlefieldInternalEvent;
    let expectedSoldiersRecruited: BattlefieldInternalEvent;
    let expectedArmy: Army;
    beforeEach(async () => {
      expectedArmy = ArmyGenerator.random();
      expectedArmyCreated =
        ArmyExposedEventsGenerator.ArmyCreated(expectedArmy).toBattlefieldInternalEvent();
      expectedSoldiersRecruited = ArmyExposedEventsGenerator.SoldiersRecruited(
        expectedArmy.id,
        expectedArmy.townId,
        expectedArmy.basicSquad
      ).toBattlefieldInternalEvent();
      await repository.save([expectedArmyCreated, expectedSoldiersRecruited]);
    });

    it('should return the battlefield event given an aggregate id', async () => {
      const battlefieldEvents = await repository.findByAggregateId(expectedArmyCreated.aggregateId);

      expect(battlefieldEvents).toStrictEqual([expectedArmyCreated, expectedSoldiersRecruited]);
    });

    it('should materialize an army given an townId', async () => {
      const army = await repository.materializeArmyByTownId(expectedArmy.townId);

      expect(army).toStrictEqual(expectedArmy);
    });

    it('should not return a non existing battlefield event', async () => {
      expect(await repository.findByAggregateId(Uuid.random().toString())).toStrictEqual([]);
    });
  });
});
