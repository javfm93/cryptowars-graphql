import { ArmyGenerator } from '../Domain/ArmyGenerator';
import { ArmyExposedEventsGenerator } from '../Domain/ArmyExposedEventsGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { CreateArmy } from '../../../../../src/Contexts/Battlefield/Armies/Application/Create/CreateArmy';
import { CreateArmyOnTownCreated } from '../../../../../src/Contexts/Battlefield/Armies/Application/Create/CreateArmyOnTownCreated';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownEventsGenerator } from '../Domain/TownEventsGenerator';
import { BattlefieldEventsRepositoryMock } from '../../Shared/__mocks__/BattlefieldEventsRepositoryMock';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Create Army', () => {
  const eventRepository = new BattlefieldEventsRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateArmy(eventRepository, eventBus);
  const handler = new CreateArmyOnTownCreated(creator);

  it('should create an army when a town is created', async () => {
    const event = TownEventsGenerator.CreatedBy();

    await handler.on(event);

    const armyId = ArmyId.create(mockedNewUuid);
    const expectedArmy = ArmyGenerator.fromEvent(event, armyId);
    const expectedEvent = ArmyExposedEventsGenerator.ArmyCreated(expectedArmy);
    eventRepository.expectLastSavedBattlefieldEventsToBe([
      expectedEvent.toBattlefieldInternalEvent()
    ]);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
