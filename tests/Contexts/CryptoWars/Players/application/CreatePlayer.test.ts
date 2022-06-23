import { PlayerRepositoryMock } from '../__mocks__/PlayerRepositoryMock';
import { UserCreatedEventGenerator } from './UserCreatedEventGenerator';
import { PlayerGenerator } from '../domain/PlayerGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { CreatePlayerOnUserCreated } from '../../../../../src/Contexts/CryptoWars/Players/Application/Create/CreatePlayerOnUserCreated';
import { CreatePlayer } from '../../../../../src/Contexts/CryptoWars/Players/Application/Create/CreatePlayer';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => {
  return { v4: () => mockedNewUuid };
});
jest.mock('uuid-validate', () => {
  return () => true;
});

describe('[Application] Create Player', () => {
  const repository = new PlayerRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreatePlayer(repository, eventBus);
  const handler = new CreatePlayerOnUserCreated(creator);

  it('should create a player when a user is created', async () => {
    const event = UserCreatedEventGenerator.random();
    const playerId = PlayerId.create(mockedNewUuid);

    await handler.on(event);

    const player = PlayerGenerator.fromEvent(event, playerId);
    const events = player.pullDomainEvents();
    repository.expectLastSavedPlayerToBe(player);
    expect(events).toHaveLength(1);
    eventBus.expectLastPublishedEventToBe(events[0]);
  });
});
