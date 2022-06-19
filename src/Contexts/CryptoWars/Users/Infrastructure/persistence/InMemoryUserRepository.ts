import { UserRepository } from '../../Domain/UserRepository';
import { User } from '../../Domain/User';
import { UserId } from '../../Domain/UserId';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { UserEmail } from '../../Domain/UserEmail';
import { initialUsers } from '../../Domain/Seed/InitialUsers';

export class InMemoryUserRepository implements UserRepository {
  private users: Array<User> = initialUsers;

  public save(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  public async searchById(id: UserId): Promise<NothingOr<User>> {
    const user = this.users.find(v => v.id.isEqualTo(id));
    return Promise.resolve(user ?? null);
  }

  public async searchByEmail(email: UserEmail): Promise<NothingOr<User>> {
    const user = this.users.find(v => v.email.isEqualTo(email));
    return Promise.resolve(user ?? null);
  }
}
