import { PlayerRepository } from '../../Domain/PlayerRepository';
import { Player } from '../../Domain/Player';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { initialPlayers } from '../../Domain/Seed/InitialPlayers';
import { UserId } from '../../../Users/Domain/UserId';
import { PlayerId } from '../../Domain/PlayerId';

export class InMemoryPlayerRepository implements PlayerRepository {
  private players: Array<Player> = initialPlayers;

  public save(user: Player): Promise<void> {
    this.players.push(user);
    return Promise.resolve();
  }

  public async searchById(id: PlayerId): Promise<NothingOr<Player>> {
    const user = this.players.find(v => id.isEqualTo(v.id));
    return Promise.resolve(user ?? null);
  }

  public async searchByUserId(userId: UserId): Promise<NothingOr<Player>> {
    const user = this.players.find(v => userId.isEqualTo(v.userId));
    return Promise.resolve(user ?? null);
  }
}
