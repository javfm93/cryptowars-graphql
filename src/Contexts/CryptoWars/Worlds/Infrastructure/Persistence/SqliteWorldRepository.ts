import { EntityTarget } from 'typeorm';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { World } from '../../Domain/World';
import { WorldId } from '../../Domain/WorldId';
import { WorldRepository } from '../../Domain/WorldRepository';
import { Worlds } from '../../Domain/Worlds';
import { WorldSchema } from './WorldSchema';

@RegisterRepository(WorldRepository)
export class SqliteWorldRepository
  extends TypeOrmRepository<Primitives<World>>
  implements WorldRepository
{
  public async save(world: World): Promise<void> {
    const repository = await this.repository();
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

  protected entitySchema(): EntityTarget<Primitives<World>> {
    return WorldSchema;
  }
}
