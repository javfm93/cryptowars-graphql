import { PlayerRepositoryMock } from '../__mocks__/PlayerRepositoryMock';
import { UserCreatedEventGenerator } from './UserCreatedEventGenerator';
import { PlayerGenerator } from '../domain/PlayerGenerator';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { CreatePlayerOnUserCreated } from '../../../../../src/Contexts/CryptoWars/Players/Application/Create/CreatePlayerOnUserCreated';
import { CreatePlayer } from '../../../../../src/Contexts/CryptoWars/Players/Application/Create/CreatePlayer';

describe('[Application] Create Player', () => {
  const repository = new PlayerRepositoryMock();
  const eventBus = new EventBusMock();
  const creator = new CreatePlayer(repository, eventBus);
  const handler = new CreatePlayerOnUserCreated(creator);

  it('should create a player when a user is created', async () => {
    const event = UserCreatedEventGenerator.random();

    await handler.on(event);

    const player = PlayerGenerator.fromEvent(event);
    const events = player.pullDomainEvents();
    repository.expectLastSavedPlayerToBe(player);
    expect(events).toHaveLength(1);
    eventBus.expectLastPublishedEventToBe(events[0]);
  });
});
