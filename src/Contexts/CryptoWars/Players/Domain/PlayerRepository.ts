import { Player } from './Player';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserId } from '../../Users/Domain/UserId';

export interface PlayerRepository {
  save(user: Player): Promise<void>;
  searchById(id: UserId): Promise<NothingOr<Player>>;
}
