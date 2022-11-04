import { ArmyRepositoryMock } from '../__mocks__/ArmyRepositoryMock';
import { ArmyGenerator } from '../domain/ArmyGenerator';
import { ArmyEventsGenerator } from '../domain/ArmyEventsGenerator';
import EventBusMock from '../../Shared/Infrastructure/EventBusMock';
import { CreateArmy } from '../../../../src/Contexts/Battlefield/Armies/Application/Create/CreateArmy';
import { CreateArmyOnTownCreated } from '../../../../src/Contexts/Battlefield/Armies/Application/Create/CreateArmyOnTownCreated';
import { ArmyId } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownEventsGenerator } from '../../CryptoWars/Towns/domain/TownEventsGenerator';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Create Army', () => {
  const repository = new ArmyRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateArmy(repository, eventBus);
  const handler = new CreateArmyOnTownCreated(creator);

  it('should create an army when a town is created', async () => {
    const event = TownEventsGenerator.randomCreated();

    await handler.on(event);

    const armyId = ArmyId.create(mockedNewUuid);
    const expectedArmy = ArmyGenerator.fromEvent(event, armyId);
    const expectedEvent = ArmyEventsGenerator.ArmyCreated(armyId);
    repository.expectLastSavedArmyToBe(expectedArmy);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
