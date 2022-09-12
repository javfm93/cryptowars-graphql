import { UserGenerator } from '../../Domain/UserGenerator';
import { UserRepository } from '../../../../../../src/Contexts/CryptoWars/Users/Domain/UserRepository';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { EnvironmentArranger } from '../../../../Shared/Infrastructure/arranger/EnvironmentArranger';

const repository: UserRepository = container.get('CryptoWars.Users.UserRepository');
const environmentArranger: Promise<EnvironmentArranger> = container.get(
  'CryptoWars.EnvironmentArranger'
);

beforeEach(async () => {
  await (await environmentArranger).arrange();
});

afterAll(async () => {
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
});

describe('[infra] UserRepository', () => {
  describe('#save', () => {
    it('should save a user', async () => {
      const user = UserGenerator.random();

      await repository.save(user);
    });
  });

  describe('#search', () => {
    it('should return an existing user by Id', async () => {
      const expectedUser = UserGenerator.random();
      await repository.save(expectedUser);

      const user = await repository.findById(expectedUser.id);

      expect(user?.toPrimitives()).toEqual(expectedUser.toPrimitives());
    });

    it('should return an existing user by Email', async () => {
      const expectedUser = UserGenerator.random();
      await repository.save(expectedUser);

      const user = await repository.findByEmail(expectedUser.email);

      expect(user?.toPrimitives()).toEqual(expectedUser.toPrimitives());
    });

    it('should not return a non existing user', async () => {
      expect(await repository.findById(UserGenerator.random().id)).toBeNull();
    });
  });
});
