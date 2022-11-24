import { UserGenerator } from '../../../IAM/Users/Domain/UserGenerator';
import { JoinWorld } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Join/JoinWorld';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { JoinWorldCommandHandler } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Join/JoinWorldCommandHandler';
import { JoinWorldCommandGenerator } from './JoinWorldCommandGenerator';

import { successAndReturn } from '../../../../../src/Contexts/Shared/Aplication/Result';
import { WorldRepositoryMock } from '../__mocks__/WorldRepositoryMock';
import { WorldGenerator } from '../Domain/WorldGenerator';
import { PlayerGenerator } from '../../Players/Domain/PlayerGenerator';
import { WorldEventsGenerator } from '../Domain/WorldEventsGenerator';
import { QueryBusMock } from '../../../Shared/Infrastructure/QueryBusMock';
import { TownEventsGenerator } from '../../Towns/Domain/TownEventsGenerator';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownId';
import { mockTimeCleanUp, mockTimeSetup } from '../../../Shared/__mocks__/MockTime';

const mockedNewUuid = '1f196f17-7437-47bd-9ac8-7ee33aa58987';

jest.mock('uuid', () => ({ v4: () => mockedNewUuid }));
jest.mock('uuid-validate', () => () => true);

describe('[Application] Join World', () => {
  beforeAll(mockTimeSetup);
  afterAll(mockTimeCleanUp);

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

    const expectedWorldEvent = WorldEventsGenerator.worldJoined(player.id, world.id);
    const expectedTownEvent = TownEventsGenerator.created(TownId.create(mockedNewUuid), player.id);
    worldRepository.expectLastSavedWorldToContain(player);
    worldRepository.expectLastSavedWorldToHaveOneTown();
    worldRepository.expectLastSavedWorldTownToHaveInitialBuildings();
    eventBus.expectPublishedEventsToBe([expectedTownEvent, expectedWorldEvent]);
  });
});
