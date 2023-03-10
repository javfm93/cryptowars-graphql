import { Player } from './Player';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../../IAM/Users/Domain/UserId';
import { PlayerId } from './PlayerId';

export type QueryOptions = { retrieveRelations: boolean };

export abstract class PlayerRepository {
  abstract save(user: Player): Promise<void>;

  abstract findById(id: PlayerId): Promise<NothingOr<Player>>;

  abstract findByUserId(id: UserId, options: QueryOptions): Promise<NothingOr<Player>>;
}
