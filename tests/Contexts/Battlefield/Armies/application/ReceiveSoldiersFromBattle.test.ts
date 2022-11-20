import { ArmyGenerator } from '../domain/ArmyGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';
import { ArmyExposedEventsGenerator } from '../domain/ArmyExposedEventsGenerator';
import { ArmyNotFound } from '../../../../../src/Contexts/Battlefield/Armies/Application/Find/ArmyNotFound';
import { ReceiveSoldiersFromBattle } from '../../../../../src/Contexts/Battlefield/Armies/Application/ReceiveSoldiersFromBattle/ReceiveSoldiersFromBattle';
import { ReceiveSoldiersFromBattleOnBattleTroopReturned } from '../../../../../src/Contexts/Battlefield/Armies/Application/ReceiveSoldiersFromBattle/ReceiveSoldiersFromBattleOnBattleTroopReturned';
import { BattleExposedEventsGenerator } from '../../Battles/Domain/BattleExposedEventsGenerator';
import { BattleGenerator } from '../../Battles/Domain/BattleGenerator';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Receive Soldiers from battle', () => {
  const repository = new BattlefieldEventsRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new ReceiveSoldiersFromBattle(repository, eventBus);
  const handler = new ReceiveSoldiersFromBattleOnBattleTroopReturned(creator);

  beforeEach(() => {
    eventBus.resetMock();
  });

  it('should receive soldiers when a troop return from a battle', async () => {
    const army = ArmyGenerator.random();
    const battle = BattleGenerator.randomForAttacker(army.id);
    const event = BattleExposedEventsGenerator.battleTroopReturned(battle);
    repository.whenMaterializeArmyByArmyIdThenReturn(army);

    await handler.on(event);

    const expectedEvent = ArmyExposedEventsGenerator.SoldiersFromBattleReceived(battle);
    repository.expectLastSavedBattlefieldEventsToBe([expectedEvent.toBattlefieldInternalEvent()]);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });

  it('should fail when the army doesnt exist', async () => {
    const army = ArmyGenerator.random();
    const battle = BattleGenerator.randomForAttacker(army.id);
    const event = BattleExposedEventsGenerator.battleTroopReturned(battle);

    try {
      await handler.on(event);
      fail("Didn't throw");
    } catch (e: any) {
      expect(e.message).toEqual(new ArmyNotFound().message);
      eventBus.expectEventsNotToBePublished();
    }
  });
});
