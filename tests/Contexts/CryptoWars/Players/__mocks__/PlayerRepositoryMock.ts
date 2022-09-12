import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerRepository } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerRepository';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';

export class PlayerRepositoryMock implements PlayerRepository {
  private mockSave = jest.fn();
  private mockSearchById = jest.fn();
  private mockSearchByUserId = jest.fn();

  async save(player: Player): Promise<void> {
    this.mockSave(player);
  }

  expectLastSavedPlayerToBe(expectedPlayer: Player): void {
    expect(this.mockSave).toBeCalledWith(expectedPlayer);
  }

  expectLastSavedPlayerToContain(object: any): void {
    expect(this.mockSave.mock.lastCall[0].toString()).toContain(object.toString());
  }

  async findById(id: PlayerId): Promise<NothingOr<Player>> {
    return this.mockSearchById(id);
  }

  whenSearchByIdThenReturn(player: NothingOr<Player>): void {
    this.mockSearchById.mockImplementationOnce(
      (id: PlayerId): NothingOr<Player> => (id.isEqualTo(player?.id) ? player : null)
    );
  }

  async findByUserId(id: UserId): Promise<NothingOr<Player>> {
    return this.mockSearchByUserId(id);
  }

  whenSearchByUserIdThenReturn(player: NothingOr<Player>): void {
    this.mockSearchByUserId.mockImplementationOnce(
      (id: UserId): NothingOr<Player> => (id.isEqualTo(player?.userId) ? player : null)
    );
  }
}
