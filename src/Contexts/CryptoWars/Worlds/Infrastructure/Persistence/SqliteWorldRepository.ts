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

  public save(world: World): Promise<void> {
    return this.persist(world.toPrimitives());
  }

  public async findById(id: WorldId): Promise<NothingOr<World>> {
    const repository = await this.repository();
    const world = await repository.findOne({ where: { id: id.toString() } });
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
