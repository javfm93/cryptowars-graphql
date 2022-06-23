import { Player } from './Player';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../Users/Domain/UserId';
import { PlayerId } from './PlayerId';

export interface PlayerRepository {
  save(user: Player): Promise<void>;
  searchById(id: PlayerId): Promise<NothingOr<Player>>;
  searchByUserId(id: UserId): Promise<NothingOr<Player>>;
}
