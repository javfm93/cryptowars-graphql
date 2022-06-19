import { ListWorldsQueryGenerator } from './ListWorldsQueryGenerator';
import { WorldRepositoryMock } from '../__mocks__/WorldRepositoryMock';
import { ListWorlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/List/ListWorlds';
import { ListWorldsQueryHandler } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/List/ListWorldsQueryHandler';
import { WorldGenerator } from '../Domain/WorldGenerator';

describe('[Application] List Worlds', () => {
  const repository = new WorldRepositoryMock();
  const creator = new ListWorlds(repository);
  const handler = new ListWorldsQueryHandler(creator);

  it('should return the list of worlds', async () => {
    const query = ListWorldsQueryGenerator.random();
    const expectedWorlds = WorldGenerator.multipleRandom();
    repository.whenGetAllThenReturn(expectedWorlds);

    const worlds = await handler.handle(query);

    expect(worlds.value).toStrictEqual(expectedWorlds);
  });
});
