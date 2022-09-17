import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerRepository } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerRepository';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';
import { World } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';

export class PlayerRepositoryMock implements PlayerRepository {
  private mockSave = jest.fn();
  private mockFindById = jest.fn();
  private mockFindByUserId = jest.fn();

  async save(player: Player): Promise<void> {
    this.mockSave(player);
  }

  expectLastSavedPlayerToBe(expectedPlayer: Player): void {
    expect(this.mockSave).toBeCalledWith(expectedPlayer);
  }

  expectLastSavedPlayerToContain(world: World): void {
    expect(this.mockSave.mock.lastCall[0].props.worlds.getItems()).toContain(world);
  }

  expectLastSavedPlayerToHaveOneTown(): void {
    expect(this.mockSave.mock.lastCall[0].props.towns.getItems()).toHaveLength(1);
  }

  async findById(id: PlayerId): Promise<NothingOr<Player>> {
    return this.mockFindById(id);
  }

  whenFindByIdThenReturn(player: NothingOr<Player>): void {
    this.mockFindById.mockImplementationOnce(
      (id: PlayerId): NothingOr<Player> => (id.isEqualTo(player?.id) ? player : null)
    );
  }

  async findByUserId(id: UserId): Promise<NothingOr<Player>> {
    return this.mockFindByUserId(id);
  }

  whenFindByUserIdThenReturn(player: Player): void {
    this.mockFindByUserId.mockImplementationOnce((id: UserId): NothingOr<Player> => {
      const a = id.isEqualTo(player?.userId) ? Player.fromPrimitives(player.toPrimitives()) : null;
      return a;
    });
  }
}
