import { VillageRepository } from '../../domain/VillageRepository';
import { Village } from '../../domain/Village';
import { VillageId } from '../../domain/VillageId';
import { Nullable } from '../../../../Shared/domain/Nullable';

export class InMemoryVillageRepository implements VillageRepository {
  private villages: Array<Village> = [];

  public save(village: Village): Promise<void> {
    this.villages.push(village);
    return Promise.resolve();
  }

  public async search(id: VillageId): Promise<Nullable<Village>> {
    const village = this.villages.find(v => v.id.isEqualTo(id));
    return Promise.resolve(village ?? null);
  }
}
