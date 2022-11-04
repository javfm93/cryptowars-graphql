import { User } from './User';
import { UserId } from './UserId';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserEmail } from './UserEmail';

export interface UserRepository {
  save(user: User): Promise<void>;
  findById(id: UserId): Promise<NothingOr<User>>;
  findByEmail(email: UserEmail): Promise<NothingOr<User>>;
}