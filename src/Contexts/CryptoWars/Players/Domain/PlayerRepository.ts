import { Player } from './Player';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../Users/Domain/UserId';
import { PlayerId } from './PlayerId';

export interface PlayerRepository {
  save(user: Player): Promise<void>;
  findById(id: PlayerId): Promise<NothingOr<Player>>;
  findByUserId(id: UserId): Promise<NothingOr<Player>>;
}
