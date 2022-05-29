import { Village } from './Village';
import { VillageId } from './VillageId';
import { Nullable } from '../../../Shared/domain/Nullable';

export interface VillageRepository {
  save(village: Village): Promise<void>;
  search(id: VillageId): Promise<Nullable<Village>>;
}
