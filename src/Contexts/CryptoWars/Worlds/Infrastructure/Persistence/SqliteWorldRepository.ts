import { WorldRepository } from '../../Domain/WorldRepository';
import { World, WorldPrimitives } from '../../Domain/World';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { WorldId } from '../../Domain/WorldId';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { Connection, EntitySchema } from 'typeorm';
import { WorldSchema } from './typeorm/WorldSchema';
import { Worlds } from '../../Domain/Worlds';

export class SqliteWorldRepository
  extends TypeOrmRepository<WorldPrimitives>
  implements WorldRepository
{
  constructor(_client: Promise<Connection>) {
    super(_client);
  }

  public async save(world: World): Promise<void> {
    // todo: we need to create a projection of the player because of not we have a cyclic dep
    const repository = await this.repository();
    // const p = world.toPrimitives();
    // const pa = p.players.map(pl => ({ id: pl.id, userId: pl.userId }));
    // p.players = pa as Array<PlayerPrimitives>;
    await repository.save(world.toPrimitives());
  }

  public async findById(id: WorldId): Promise<NothingOr<World>> {
    const repository = await this.repository();
    const world = await repository.findOne({
      where: { id: id.toString() },
      relations: { towns: true, players: true }
    });
    return world ? World.fromPrimitives(world) : null;
  }

  public async findAll(): Promise<Worlds> {
    const repository = await this.repository();
    const worlds = await repository.find();
    return Worlds.fromPrimitives(worlds);
  }

  protected entitySchema(): EntitySchema<WorldPrimitives> {
    return WorldSchema;
  }
}
