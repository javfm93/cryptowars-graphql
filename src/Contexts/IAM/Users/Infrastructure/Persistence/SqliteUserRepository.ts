import { UserRepository } from '../../Domain/UserRepository';
import { User, UserPrimitives } from '../../Domain/User';
import { NothingOr } from '../../../../Shared/Domain/Nullable';
import { UserId } from '../../Domain/UserId';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { EntitySchema } from 'typeorm';
import { UserSchema } from './typeorm/UserSchema';
import { UserEmail } from '../../Domain/UserEmail';

@RegisterRepository(UserRepository)
export class SqliteUserRepository
  extends TypeOrmRepository<UserPrimitives>
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

  protected entitySchema(): EntitySchema<UserPrimitives> {
    return UserSchema;
  }
}
