import { EntityTarget } from 'typeorm';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { Town } from '../../Domain/Town';
import { TownId } from '../../Domain/TownId';
import { TownRepository } from '../../Domain/TownRepository';
import { TownSchema } from '../TownSchema';

@RegisterRepository(TownRepository)
export class SqliteTownRepository
  extends TypeOrmRepository<Primitives<Town>>
  implements TownRepository
{
  public save(town: Town): Promise<void> {
    return this.persist(town.toPrimitives());
  }

  public async findById(id: TownId): Promise<NothingOr<Town>> {
    const repository = await this.repository();
    const town = await repository.findOne({ where: { id: id.toString() } });
    return town ? Town.fromPrimitives(town) : null;
  }

  protected entitySchema(): EntityTarget<Primitives<Town>> {
    return TownSchema;
  }
}
