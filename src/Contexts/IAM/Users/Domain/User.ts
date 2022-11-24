import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserPassword } from './UserPassword';

export interface UserProps {
  email: UserEmail;
  password: UserPassword;
}

export interface UserPrimitives {
  id: string;
  email: string;
  password: string;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(id: UserId, props: UserProps) {
    super(id, props);
  }

  public static create(id: UserId, props: UserProps): User {
    const user = new User(id, props);
    const userCreated = new UserCreatedDomainEvent({
      aggregateId: user.id.toString()
    });
    user.record(userCreated);
    return user;
  }

  public get email(): UserEmail {
    return this.props.email;
  }

  public get password(): UserPassword {
    return this.props.password;
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.toString(),
      email: this.props.email.toString(),
      password: this.props.password.toString()
    };
  }

  static fromPrimitives(plainData: UserPrimitives): User {
    const email = UserEmail.fromPrimitives(plainData.email);
    const password = UserPassword.fromPrimitives(plainData.password);
    return new User(UserId.create(plainData.id), { email, password });
  }
}
