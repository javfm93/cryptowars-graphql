import { Town } from './Town';
import { TownId } from './TownId';
import { Nullable } from '../../../Shared/Domain/Nullable';

export abstract class TownRepository {
  abstract save(town: Town): Promise<void>;
  abstract findById(id: TownId): Promise<Nullable<Town>>;
}
