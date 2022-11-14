import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { ArmyGenerator } from '../../Armies/domain/ArmyGenerator';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';
import { CreateBattle } from '../../../../../src/Contexts/Battlefield/Battles/Application/Create/CreateBattle';
import { CreateBattleOnAttackArrived } from '../../../../../src/Contexts/Battlefield/Battles/Application/Create/CreateBattleOnAttackArrived';
import { AttackExposedEventsGenerator } from '../../Attacks/Domain/AttackExposedEventsGenerator';
import { AttackGenerator } from '../../Attacks/Domain/AttackGenerator';
import { BattleExposedEventsGenerator } from '../Domain/BattleExposedEventsGenerator';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { BattleId } from '../../../../../src/Contexts/Battlefield/Battles/Domain/BattleId';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Create Battle', () => {
  const repository = new BattlefieldEventsRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateBattle(repository, eventBus);
  const handler = new CreateBattleOnAttackArrived(creator);

  beforeEach(() => {
    eventBus.resetMock();
    repository.resetMocks();
  });
  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

  it('should create a battle when the attack arrives', async () => {
    const defenderArmy = ArmyGenerator.random();
    const attack = AttackGenerator.randomToDefender(defenderArmy);
    const event = AttackExposedEventsGenerator.attackArrivedFor(attack.id.toString());
    repository.whenMaterializeAttackByIdThenReturn(attack);
    repository.whenMaterializeArmyByArmyIdThenReturn(defenderArmy);

    await handler.on(event);

    const battle = Battle.create(BattleId.create(mockedNewUuid), attack, defenderArmy);
    const expectedEvent = BattleExposedEventsGenerator.battleCreatedFor(battle);
    repository.expectLastSavedBattlefieldEventsToBe([expectedEvent.toBattlefieldInternalEvent()]);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  describe('should not create an battle when: ', () => {
    it('the defender Army does not exist', async () => {
      const defenderArmy = ArmyGenerator.random();
      const attack = AttackGenerator.randomToDefender(defenderArmy);
      const event = AttackExposedEventsGenerator.attackArrivedFor(attack.id.toString());
      repository.whenMaterializeAttackByIdThenReturn(attack);

      await handler.on(event);

      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });

    it('the attack does not exist', async () => {
      const defenderArmy = ArmyGenerator.random();
      const attack = AttackGenerator.randomToDefender(defenderArmy);
      const event = AttackExposedEventsGenerator.attackArrivedFor(attack.id.toString());

      await handler.on(event);

      repository.expectSavedNotToBeCalled();
      eventBus.expectEventsNotToBePublished();
    });
  });
});
