import { PlayerRepositoryMock } from '../__mocks__/PlayerRepositoryMock';
import { UserCreatedEventGenerator } from '../../../IAM/Users/Domain/UserCreatedEventGenerator';
import { PlayerGenerator } from '../domain/PlayerGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { CreatePlayerOnUserCreated } from '../../../../../src/Contexts/CryptoWars/Players/Application/Create/CreatePlayerOnUserCreated';
import { CreatePlayer } from '../../../../../src/Contexts/CryptoWars/Players/Application/Create/CreatePlayer';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerEventsGenerator } from '../domain/PlayerEventsGenerator';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => {
  return { v4: () => mockedNewUuid };
});
jest.mock('uuid-validate', () => {
  return () => true;
});

describe('[Application] Create Army', () => {
  const repository = new PlayerRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreatePlayer(repository, eventBus);
  const handler = new CreatePlayerOnUserCreated(creator);

  it('should create a player when a user is created', async () => {
    const event = UserCreatedEventGenerator.random();

    await handler.on(event);

    const playerId = PlayerId.create(mockedNewUuid);
    const expectedPlayer = PlayerGenerator.fromEvent(event, playerId);
    const expectedEvent = PlayerEventsGenerator.PlayerCreated(playerId);
    repository.expectLastSavedPlayerToBe(expectedPlayer);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
