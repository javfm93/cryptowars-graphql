import { VillageRepository } from '../../domain/VillageRepository';
import { MongoRepository } from '../../../../Shared/infrastructure/persistence/mongo/MongoRepository';
import { Village, VillageProps } from '../../domain/Village';
import { VillageId } from '../../domain/VillageId';
import { Nullable } from '../../../../Shared/domain/Nullable';

export class MongoVillageRepository
  extends MongoRepository<Village, VillageProps>
  implements VillageRepository
{
  public save(village: Village): Promise<void> {
    return this.persist(village.id.toString(), village);
  }

  public async search(id: VillageId): Promise<Nullable<Village>> {
    const collection = await this.collection();
    const document = await collection.findOne({ _id: id.toString() });

    return document ? Village.fromPrimitives({ ...document, id: id.toString() }) : null;
  }

  protected moduleName(): string {
    return 'courses';
  }
}
