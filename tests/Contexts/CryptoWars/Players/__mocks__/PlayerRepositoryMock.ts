import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { NothingOr } from '../../../../../src/Contexts/Shared/Domain/Nullable';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerRepository } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerRepository';

export class PlayerRepositoryMock implements PlayerRepository {
  private mockSave = jest.fn();
  private mockSearchById = jest.fn();

  async save(player: Player): Promise<void> {
    this.mockSave(player);
  }

  expectLastSavedPlayerToBe(expectedPlayer: Player): void {
    expect(this.mockSave).toBeCalledWith(expectedPlayer);
  }

  async searchById(id: PlayerId): Promise<NothingOr<Player>> {
    return this.mockSearchById(id);
  }

  whenSearchByIdThenReturn(player: NothingOr<Player>): void {
    this.mockSearchById.mockImplementationOnce(
      (id: PlayerId): NothingOr<Player> => (id.isEqualTo(player?.id) ? player : null)
    );
  }
}
