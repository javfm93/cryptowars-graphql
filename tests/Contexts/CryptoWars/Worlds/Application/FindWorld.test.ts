import { WorldRepositoryMock } from '../__mocks__/WorldRepositoryMock';
import { WorldGenerator } from '../Domain/WorldGenerator';
import { FindWorld } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Find/FindWorld';
import { FindWorldQueryHandler } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Find/FindWorldQueryHandler';
import { FindWorldQueryGenerator } from './FindWorldQueryGenerator';
import { WorldNotFound } from '../../../../../src/Contexts/CryptoWars/Worlds/Application/Find/WorldNotFound';

describe('[Application] Find World', () => {
  const repository = new WorldRepositoryMock();
  const finder = new FindWorld(repository);
  const handler = new FindWorldQueryHandler(finder);

  it('should find an existent world', async () => {
    const expectedWorld = WorldGenerator.random();
    const query = FindWorldQueryGenerator.create(expectedWorld.id.toString());
    repository.whenFindByIdThenReturn(expectedWorld);

    const result = await handler.handle(query);

    expect(result.value).toBe(expectedWorld);
  });

  it('should not find an world that doesnt exist', async () => {
    const expectedWorld = WorldGenerator.random();
    const query = FindWorldQueryGenerator.create(expectedWorld.id.toString());

    const result = await handler.handle(query);

    if (result.isSuccess()) fail();
    expect(result.value.isEqualTo(WorldNotFound)).toBeTruthy();
  });
});
