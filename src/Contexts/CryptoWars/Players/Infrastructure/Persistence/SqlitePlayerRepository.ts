import { PlayerRepository, QueryOptions } from '../../Domain/PlayerRepository';
import { Player, PlayerPrimitives } from '../../Domain/Player';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { PlayerId } from '../../Domain/PlayerId';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema } from 'typeorm';
import { PlayerSchema } from './typeorm/PlayerSchema';

@RegisterRepository(PlayerRepository)
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

  public async findByUserId(
    userId: UserId,
    queryOptions: QueryOptions
  ): Promise<NothingOr<Player>> {
    const repository = await this.repository();
    const baseOptions = { where: { userId: userId.toString() } };
    const withRelations = { ...baseOptions, relations: { towns: true, worlds: true } };
    const options = queryOptions.retrieveRelations ? withRelations : baseOptions;
    const player = await repository.findOne(options);
    return player ? Player.fromPrimitives(player) : null;
  }

  protected entitySchema(): EntitySchema<PlayerPrimitives> {
    return PlayerSchema;
  }
}
