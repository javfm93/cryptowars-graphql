import { World } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { WorldRepository } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';

export class WorldRepositoryMock implements WorldRepository {
  private mockFindAll = jest.fn();
  private mockFindById = jest.fn();

  async findAll(): Promise<Worlds> {
    return this.mockFindAll();
  }

  whenFindAllThenReturn(value: Worlds): void {
    this.mockFindAll.mockReturnValueOnce(value);
  }

  save(world: World): Promise<void> {
    throw Error('not implemented');
  }

  findById(worldId: WorldId): Promise<NothingOr<World>> {
    return this.mockFindById(worldId);
  }

  whenFindByIdThenReturn(world: NothingOr<World>): void {
    this.mockFindById.mockImplementationOnce((id: WorldId): NothingOr<World> => {
      return world?.id.isEqualTo(id) ? world : null;
    });
  }
}
