import { TownRepository } from '../../domain/TownRepository';
import { Town, TownPrimitives } from '../../domain/Town';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { TownId } from '../../domain/TownId';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema } from 'typeorm';
import { TownSchema } from './typeorm/TownSchema';

export class SqliteTownRepository
  extends TypeOrmRepository<TownPrimitives>
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

  protected entitySchema(): EntitySchema<TownPrimitives> {
    return TownSchema;
  }
}
