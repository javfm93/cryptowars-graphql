import { World } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { WorldRepository } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldRepository';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { Town } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Town';
import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';

export class WorldRepositoryMock implements WorldRepository {
  private mockFindAll = jest.fn();
  private mockSave = jest.fn();
  private mockFindById = jest.fn();

  async findAll(): Promise<Worlds> {
    return this.mockFindAll();
  }

  whenFindAllThenReturn(value: Worlds): void {
    this.mockFindAll.mockReturnValueOnce(value);
  }

  async save(world: World): Promise<void> {
    this.mockSave(world);
  }

  expectLastSavedWorldToBe(expectedWorld: World): void {
    expect(this.mockSave).toBeCalledWith(expectedWorld);
  }

  expectLastSavedWorldToContain(player: Player): void {
    expect(this.mockSave.mock.lastCall[0].props.players.getItems()).toContain(player);
  }

  expectLastSavedWorldToHaveOneTown(): void {
    expect(this.mockSave.mock.lastCall[0].props.towns.getItems()).toHaveLength(1);
  }

  expectLastSavedWorldTownToHaveInitialBuildings(): void {
    const savedTown: Town = this.mockSave.mock.lastCall[0].props.towns.getItems()[0];
    const initialTown = {
      headquarter: {
        level: 0,
        essenceRequiredToLevelUp: 10
      },
      essenceGenerator: {
        level: 1,
        essenceRequiredToLevelUp: 30
      }
    };
    expect(savedTown.toPrimitives().buildings).toStrictEqual(initialTown);
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
