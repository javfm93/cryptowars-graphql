import { TownRepositoryMock } from '../__mocks__/TownRepositoryMock';
import { CreateTown } from '../../../../../src/Contexts/CryptoWars/Towns/Application/Create/CreateTown';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerEventsGenerator } from '../../Players/domain/PlayerEventsGenerator';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { TownGenerator } from '../domain/TownGenerator';
import { TownCreatedEventGenerator } from '../domain/TownCreatedEventGenerator';
import { CreateTownOnPlayerWorldSelected } from '../../../../../src/Contexts/CryptoWars/Towns/application/Create/CreateTownOnPlayerWorldSelected';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => {
  return { v4: () => mockedNewUuid };
});
jest.mock('uuid-validate', () => {
  return () => true;
});

describe('Application/Handler/CreateTown', () => {
  const repository = new TownRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreateTown(repository, eventBus);
  const handler = new CreateTownOnPlayerWorldSelected(creator);

  it('should create a town when a player selects a world', async () => {
    const playerId = PlayerId.create(mockedNewUuid);
    const worldId = WorldId.create(mockedNewUuid);
    const event = PlayerEventsGenerator.PlayerWorldSelected(playerId, worldId);

    await handler.on(event);

    const expectedTown = TownGenerator.fromEvent(event, mockedNewUuid);
    const expectedEvent = TownCreatedEventGenerator.create(playerId);
    repository.expectLastSavedTownToBe(expectedTown);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
