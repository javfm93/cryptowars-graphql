import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserPassword } from './UserPassword';
import { UserName } from './UserName';
import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class User extends AggregateRoot {
  private constructor(
    id: UserId,
    readonly email: UserEmail,
    readonly password: UserPassword,
    readonly name: UserName
  ) {
    super(id);
  }

  public static create(id: UserId, email: UserEmail, password: UserPassword, name: UserName): User {
    const user = new User(id, email, password, name);
    const userCreated = new UserCreatedDomainEvent({
      aggregateId: user.id.toString(),
      attributes: { name: name.toString() }
    });
    user.record(userCreated);
    return user;
  }

  toPrimitives(): Primitives<User> {
    return {
      id: this.id.toString(),
      email: this.email.toString(),
      password: this.password.toString(),
      name: this.name.toString()
    };
  }

  static fromPrimitives(plainData: Primitives<User>): User {
    const email = UserEmail.fromPrimitives(plainData.email);
    const password = UserPassword.fromPrimitives(plainData.password);
    const name = UserName.fromPrimitives(plainData.name);
    return new User(UserId.create(plainData.id), email, password, name);
  }
}
