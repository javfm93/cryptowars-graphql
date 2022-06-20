import { UserRepositoryMock } from '../__mocks__/UserRepositoryMock';
import { UserGenerator } from '../Domain/UserGenerator';
import { FindUser } from '../../../../../src/Contexts/CryptoWars/Users/Application/Find/FindUser';
import { FindUserQueryHandler } from '../../../../../src/Contexts/CryptoWars/Users/Application/Find/FindUserQueryHandler';
import { FindUserQueryGenerator } from './FindUserQueryGenerator';
import { UserNotFound } from '../../../../../src/Contexts/CryptoWars/Users/Domain/Errors/UserNotFound';

describe('[Application] Find User', () => {
  const repository = new UserRepositoryMock();
  const finder = new FindUser(repository);
  const handler = new FindUserQueryHandler(finder);

  it('should find an existent user', async () => {
    const expectedUser = UserGenerator.random();
    const query = FindUserQueryGenerator.create(expectedUser.id.toString());
    repository.whenSearchByIdThenReturn(expectedUser);

    const result = await handler.handle(query);

    expect(result.value).toBe(expectedUser);
  });

  it('should not find an user that doesnt exist', async () => {
    const expectedUser = UserGenerator.random();
    const query = FindUserQueryGenerator.create(expectedUser.id.toString());

    const result = await handler.handle(query);

    if (result.isSuccess()) fail();
    expect(result.value.isEqualTo(UserNotFound)).toBeTruthy();
  });
});
