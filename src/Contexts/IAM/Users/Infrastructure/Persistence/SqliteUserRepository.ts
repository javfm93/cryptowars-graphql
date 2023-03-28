import { UserRepository } from '../../Domain/UserRepository';
import { User } from '../../Domain/User';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { UserId } from '../../Domain/UserId';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntityTarget } from 'typeorm';
import { UserSchema } from '../UserSchema';
import { UserEmail } from '../../Domain/UserEmail';
import { Primitives } from '../../../../Shared/Domain/Primitives';

@RegisterRepository(UserRepository)
export class SqliteUserRepository
  extends TypeOrmRepository<Primitives<User>>
  implements UserRepository
{
  public save(user: User): Promise<void> {
    return this.persist(user.toPrimitives());
  }

  public async findById(id: UserId): Promise<NothingOr<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({ where: { id: id.toString() } });
    return user ? User.fromPrimitives(user) : null;
  }

  public async findByEmail(email: UserEmail): Promise<NothingOr<User>> {
    const repository = await this.repository();
    const user = await repository.findOne({ where: { email: email.toString() } });
    return user ? User.fromPrimitives(user) : null;
  }

  protected entitySchema(): EntityTarget<Primitives<User>> {
    return UserSchema;
  }
}
