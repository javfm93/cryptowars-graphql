import { UserRepository } from '../../Domain/UserRepository';
import { User } from '../../Domain/User';
import { UserId } from '../../Domain/UserId';
import { Nullable } from '../../../../Shared/Domain/Nullable';

export class InMemoryUserRepository implements UserRepository {
  private users: Array<User> = [];

  public save(user: User): Promise<void> {
    this.users.push(user);
    return Promise.resolve();
  }

  public async search(id: UserId): Promise<Nullable<User>> {
    const user = this.users.find(v => v.id.isEqualTo(id));
    return Promise.resolve(user ?? null);
  }
}
