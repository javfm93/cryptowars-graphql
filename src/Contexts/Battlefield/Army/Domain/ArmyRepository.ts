import { Army } from './Army';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../../IAM/Users/Domain/UserId';
import { PlayerId } from './PlayerId';

export interface PlayerRepository {
  save(user: Army): Promise<void>;

  findById(id: PlayerId): Promise<NothingOr<Army>>;

  findByUserId(id: UserId): Promise<NothingOr<Army>>;
}
