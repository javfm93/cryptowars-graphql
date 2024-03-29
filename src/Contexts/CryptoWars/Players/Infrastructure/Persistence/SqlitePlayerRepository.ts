import { EntityTarget } from 'typeorm';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { Player } from '../../Domain/Player';
import { PlayerId } from '../../Domain/PlayerId';
import { PlayerRepository, QueryOptions } from '../../Domain/PlayerRepository';
import { PlayerSchema } from '../PlayerSchema';

@RegisterRepository(PlayerRepository)
export class SqlitePlayerRepository
  extends TypeOrmRepository<Primitives<Player>>
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

  protected entitySchema(): EntityTarget<Primitives<Player>> {
    return PlayerSchema;
  }
}
