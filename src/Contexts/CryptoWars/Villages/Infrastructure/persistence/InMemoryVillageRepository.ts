import { VillageRepository } from '../../Domain/VillageRepository';
import { Village } from '../../Domain/Village';
import { VillageId } from '../../Domain/VillageId';
import { Nullable } from '../../../../Shared/Domain/Nullable';

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
