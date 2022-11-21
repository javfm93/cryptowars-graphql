import { PlayerRepository } from '../../Domain/PlayerRepository';
import { Player } from '../../Domain/Player';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { PlayerId } from '../../Domain/PlayerId';

export class InMemoryPlayerRepository implements PlayerRepository {
  private players: Array<Player> = [];

  public save(user: Player): Promise<void> {
    this.players.push(user);
    return Promise.resolve();
  }

  public async findById(id: PlayerId): Promise<NothingOr<Player>> {
    const user = this.players.find(v => id.isEqualTo(v.id));
    return Promise.resolve(user ?? null);
  }

  public async findByUserId(userId: UserId): Promise<NothingOr<Player>> {
    const user = this.players.find(v => userId.isEqualTo(v.userId));
    return Promise.resolve(user ?? null);
  }
}
