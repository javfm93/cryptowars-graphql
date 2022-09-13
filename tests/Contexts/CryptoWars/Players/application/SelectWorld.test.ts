import { UserGenerator } from '../../Users/domain/UserGenerator';
import { SelectWorld } from '../../../../../src/Contexts/CryptoWars/Players/Application/SelectWorld/SelectWorld';
import EventBusMock from '../../../Shared/Infrastructure/EventBusMock';
import { SelectWorldCommandHandler } from '../../../../../src/Contexts/CryptoWars/Players/Application/SelectWorld/SelectWorldCommandHandler';
import { PlayerRepositoryMock } from '../__mocks__/PlayerRepositoryMock';
import { PlayerGenerator } from '../domain/PlayerGenerator';
import { WorldGenerator } from '../../Worlds/Domain/WorldGenerator';
import { SelectWorldCommandGenerator } from './SelectWorldCommandGenerator';
import { QueryBus } from '../../../../../src/Contexts/Shared/Domain/QueryBus';
import { Response } from '../../../../../src/Contexts/Shared/Domain/Response';
import { Query, QueryResult } from '../../../../../src/Contexts/Shared/Domain/Query';
import { successAndReturn } from '../../../../../src/Contexts/Shared/Aplication/Result';
import { PlayerEventsGenerator } from '../domain/PlayerEventsGenerator';

class QueryBusMock implements QueryBus {
  private mockAsk = jest.fn();

  ask<R extends Response>(query: Query): Promise<R> {
    return this.mockAsk(query);
  }

  whenAskThenReturn<Result, Errors>(response: QueryResult<Result, Errors>): void {
    this.mockAsk.mockResolvedValueOnce(response);
  }
}

describe('[Application] Player Selects World', () => {
  const playerRepository = new PlayerRepositoryMock();
  const queryBusMock = new QueryBusMock();
  const eventBus = new EventBusMock();
  const useCase = new SelectWorld(playerRepository, queryBusMock, eventBus);
  const handler = new SelectWorldCommandHandler(useCase);

  it('should assign a world to the player', async () => {
    const user = UserGenerator.random();
    const player = PlayerGenerator.fromUser(user);
    const world = WorldGenerator.random();
    const command = SelectWorldCommandGenerator.create(user.id.toString(), world.id.toString());
    queryBusMock.whenAskThenReturn(successAndReturn(world));
    playerRepository.whenSearchByUserIdThenReturn(player);

    await handler.handle(command);

    const expectedEvent = PlayerEventsGenerator.PlayerWorldSelected(player.id, world.id);
    playerRepository.expectLastSavedPlayerToContain(world);
    eventBus.expectLastPublishedEventToBe(expectedEvent);
  });
});
