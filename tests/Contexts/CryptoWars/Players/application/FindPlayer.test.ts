import { FindPlayerQueryGenerator } from './FindPlayerQueryGenerator';
import { PlayerRepositoryMock } from '../__mocks__/PlayerRepositoryMock';
import { PlayerGenerator } from '../domain/PlayerGenerator';
import { FindPlayer } from '../../../../../src/Contexts/CryptoWars/Players/Application/Find/FindPlayer';
import { FindPlayerQueryHandler } from '../../../../../src/Contexts/CryptoWars/Players/Application/Find/FindPlayerQueryHandler';

describe('[Application] Find Army', () => {
  const repository = new PlayerRepositoryMock();
  const creator = new FindPlayer(repository);
  const handler = new FindPlayerQueryHandler(creator);

  it('should return the player', async () => {
    const expectedPlayer = PlayerGenerator.withWorldsAndTowns();
    const query = FindPlayerQueryGenerator.create(expectedPlayer.userId);
    repository.whenFindByUserIdThenReturn(expectedPlayer);

    const player = await handler.handle(query);

    expect(player.value).toStrictEqual(expectedPlayer);
  });
});
