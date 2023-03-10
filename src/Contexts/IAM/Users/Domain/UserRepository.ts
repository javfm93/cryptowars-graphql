import { User } from './User';
import { UserId } from './UserId';
import { NothingOr } from '../../../Shared/Domain/Nullable';
import { UserEmail } from './UserEmail';

export abstract class UserRepository {
  abstract save(user: User): Promise<void>;

  abstract findById(id: UserId): Promise<NothingOr<User>>;

  abstract findByEmail(email: UserEmail): Promise<NothingOr<User>>;
}
