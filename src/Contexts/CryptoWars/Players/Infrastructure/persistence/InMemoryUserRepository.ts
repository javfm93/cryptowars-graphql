import { PlayerRepository } from '../../Domain/PlayerRepository';
import { Player } from '../../Domain/Player';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { initialPlayers } from '../../Domain/Seed/InitialPlayers';
import { UserId } from '../../../Users/Domain/UserId';

export class InMemoryUserRepository implements PlayerRepository {
  private players: Array<Player> = initialPlayers;

  public save(user: Player): Promise<void> {
    this.players.push(user);
    return Promise.resolve();
  }

  public async searchById(id: UserId): Promise<NothingOr<Player>> {
    const user = this.players.find(v => id.isEqualTo(v.id));
    return Promise.resolve(user ?? null);
  }
}
