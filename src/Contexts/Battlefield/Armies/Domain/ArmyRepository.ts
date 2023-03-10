import { Army } from './Army';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/Domain/TownId';

export abstract class ArmyRepository {
  abstract save(army: Army): Promise<void>;

  abstract findById(id: ArmyId): Promise<NothingOr<Army>>;

  abstract findByTownId(id: TownId): Promise<NothingOr<Army>>;
}
