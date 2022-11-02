import { PlayerRepository } from '../../Domain/PlayerRepository';
import { Player, PlayerPrimitives } from '../../Domain/Player';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { PlayerId } from '../../Domain/PlayerId';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema } from 'typeorm';
import { PlayerSchema } from './typeorm/PlayerSchema';

export class SqlitePlayerRepository
  extends TypeOrmRepository<PlayerPrimitives>
  implements PlayerRepository
{
  public save(player: Player): Promise<void> {
    return this.persist(player.toPrimitives());
  }

  public async findById(id: PlayerId): Promise<NothingOr<Player>> {
    const repository = await this.repository();
    const player = await repository.findOne({
      where: { id: id.toString() },
      relations: { towns: true, worlds: true }
    });
    return player ? Player.fromPrimitives(player) : null;
  }

  public async findByUserId(userId: UserId): Promise<NothingOr<Player>> {
    const repository = await this.repository();
    const player = await repository.findOne({
      where: { userId: userId.toString() },
      relations: { towns: true, worlds: true }
    });
    return player ? Player.fromPrimitives(player) : null;
  }

  protected entitySchema(): EntitySchema<PlayerPrimitives> {
    return PlayerSchema;
  }
}
