import { Army } from './Army';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/domain/TownId';

export interface ArmyRepository {
  save(army: Army): Promise<void>;

  findById(id: ArmyId): Promise<NothingOr<Army>>;

  findByTownId(id: TownId): Promise<NothingOr<Army>>;
}
