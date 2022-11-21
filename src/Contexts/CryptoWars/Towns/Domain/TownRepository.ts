import { Town } from './Town';
import { TownId } from './TownId';
import { Nullable } from '../../../Shared/Domain/Nullable';

export interface TownRepository {
  save(town: Town): Promise<void>;
  findById(id: TownId): Promise<Nullable<Town>>;
}
