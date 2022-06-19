import { World } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { WorldRepository } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';

export class WorldRepositoryMock implements WorldRepository {
  private mockGetAll = jest.fn();

  async getAll(): Promise<Array<World>> {
    return this.mockGetAll();
  }

  whenGetAllThenReturn(value: Array<World>): void {
    this.mockGetAll.mockReturnValueOnce(value);
  }

  save(world: World): Promise<void> {
    throw Error('not implemented');
  }
}
