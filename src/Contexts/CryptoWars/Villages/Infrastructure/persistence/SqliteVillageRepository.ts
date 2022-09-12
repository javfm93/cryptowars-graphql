import { VillageRepository } from '../../Domain/VillageRepository';
import { Village, VillagePrimitives } from '../../Domain/Village';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { VillageId } from '../../Domain/VillageId';
import { TypeOrmRepository } from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema } from 'typeorm';
import { VillageSchema } from './typeorm/VillageSchema';

export class SqliteVillageRepository
  extends TypeOrmRepository<VillagePrimitives>
  implements VillageRepository
{
  public save(village: Village): Promise<void> {
    return this.persist(village.toPrimitives());
  }

  public async findById(id: VillageId): Promise<NothingOr<Village>> {
    const repository = await this.repository();
    const village = await repository.findOne({ where: { id: id.toString() } });
    return village ? Village.fromPrimitives(village) : null;
  }

  protected entitySchema(): EntitySchema<VillagePrimitives> {
    return VillageSchema;
  }
}
