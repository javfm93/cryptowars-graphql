import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { BattlefieldInternalEventRepository } from '../../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEventRepository';
import { ArmyExposedEventsGenerator } from '../../../Armies/domain/ArmyExposedEventsGenerator';
import { ArmyGenerator } from '../../../Armies/domain/ArmyGenerator';
import { BattlefieldInternalEvent } from '../../../../../../src/Contexts/Battlefield/Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../../../../src/Contexts/Shared/Domain/value-object/Uuid';

import { Army } from '../../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { AttackExposedEventsGenerator } from '../../../Attacks/Domain/AttackExposedEventsGenerator';
import { AttackId } from '../../../../../../src/Contexts/Battlefield/Attacks/Domain/AttackId';
import { AttackGenerator } from '../../../Attacks/Domain/AttackGenerator';
import { BattleGenerator } from '../../../Battles/Domain/BattleGenerator';
import { BattleExposedEventsGenerator } from '../../../Battles/Domain/BattleExposedEventsGenerator';
import { mockTimeCleanUp, mockTimeSetup } from '../../../../Shared/__mocks__/MockTime';

const repository: BattlefieldInternalEventRepository = container.get(
  'Battlefield.Shared.BattlefieldInternalEventRepository'
);

describe('[infra] BattlefieldInternalEventRepository', () => {
  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);
  describe('#save', () => {
    it('should save multiple battlefield event', async () => {
      const army = ArmyGenerator.random();
      const armyCreated = ArmyExposedEventsGenerator.ArmyCreated(army).toBattlefieldInternalEvent();
      const soldiersRecruited = ArmyExposedEventsGenerator.SoldiersRecruited(
        army.id,
        army.townId,
        army.getBasicSquad()
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
        expectedArmy.getBasicSquad()
      ).toBattlefieldInternalEvent();
      await repository.save([expectedArmyCreated, expectedSoldiersRecruited]);
    });

    it('should return the battlefield event given an aggregate id', async () => {
      const battlefieldEvents = await repository.findOneByAggregateId(
        new Uuid(expectedArmyCreated.aggregateId)
      );
      expect(battlefieldEvents).toStrictEqual(expectedArmyCreated);
    });

    it('should materialize an army given an townId', async () => {
      const army = await repository.materializeArmyByTownId(expectedArmy.townId);
      expect(army).toStrictEqual(expectedArmy);
    });

    it('should materialize an army given an armyId', async () => {
      const army = await repository.materializeArmyByArmyId(expectedArmy.id);
      expect(army).toStrictEqual(expectedArmy);
    });

    it('should materialize an attack given an attackId', async () => {
      const expectedAttack = AttackGenerator.random();
      const attackSent = AttackExposedEventsGenerator.attackSentFromAttack(expectedAttack);
      await repository.save([attackSent.toBattlefieldInternalEvent()]);
      const attack = await repository.materializeAttackById(
        AttackId.create(attackSent.aggregateId)
      );
      expect(attack).toStrictEqual(expectedAttack);
    });

    it('should materialize a battle given a battleId', async () => {
      const expectedBattle = BattleGenerator.random();
      const battleCreated = BattleExposedEventsGenerator.battleCreatedFor(expectedBattle);
      await repository.save([battleCreated.toBattlefieldInternalEvent()]);
      const battle = await repository.materializeBattleById(expectedBattle.id);
      expect(battle).toStrictEqual(expectedBattle);
    });

    it('should not return a non existing battlefield event', async () => {
      expect(await repository.findOneByAggregateId(Uuid.random())).toStrictEqual(null);
    });
  });
});
