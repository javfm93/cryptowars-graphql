import { UserGenerator } from '../../Users/Domain/UserGenerator';
import { JoinWorld } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Join/JoinWorld';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { JoinWorldCommandHandler } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommandHandler';
import { JoinWorldCommandGenerator } from './JoinWorldCommandGenerator';

import { successAndReturn } from '../../../../../src/Contexts/Shared/Aplication/Result';
import { WorldRepositoryMock } from '../__mocks__/WorldRepositoryMock';
import { WorldGenerator } from '../Domain/WorldGenerator';
import { PlayerGenerator } from '../../Players/domain/PlayerGenerator';
import { WorldEventsGenerator } from '../Domain/WorldEventsGenerator';
import { QueryBusMock } from '../../../Shared/Infrastructure/QueryBusMock';

describe('[Application] Join World', () => {
  const worldRepository = new WorldRepositoryMock();
  const queryBusMock = new QueryBusMock();
  const eventBus = new EventBusMock();
  const useCase = new JoinWorld(worldRepository, queryBusMock, eventBus);
  const handler = new JoinWorldCommandHandler(useCase);

  it('should join a world', async () => {
    const user = UserGenerator.random();
    const player = PlayerGenerator.fromUser(user.id);
    const world = WorldGenerator.empty();
    const command = JoinWorldCommandGenerator.create(user.id.toString(), world.id.toString());
    queryBusMock.whenAskThenReturn(successAndReturn(world));
    queryBusMock.whenAskThenReturn(successAndReturn(player));

    await handler.handle(command);

    const expectedEvent = WorldEventsGenerator.worldJoined(player.id, world.id);
    worldRepository.expectLastSavedWorldToContain(player);
    worldRepository.expectLastSavedWorldToHaveOneTown();
    worldRepository.expectLastSavedWorldTownToHaveInitialBuildings();
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
