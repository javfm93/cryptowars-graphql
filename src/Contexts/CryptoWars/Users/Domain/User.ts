import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { UserCreatedDomainEvent } from './UserCreatedDomainEvent';
import { UserEmail } from './UserEmail';
import { UserId } from './UserId';
import { UserPassword } from './UserPassword';
import { Either, failure, success } from '../../../Shared/Aplication/Result';

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
    user.record(
      new UserCreatedDomainEvent({
        id: user.id.toString()
      })
    );
    return user;
  }

  toPrimitives(): UserPrimitives {
    return {
      id: this.id.toString(),
      email: this.props.email.toString(),
      password: this.props.password.toString()
    };
  }

  static fromPrimitives(plainData: UserPrimitives): Either<User, Error> {
    const emailCreation = UserEmail.create(plainData.email);
    if (emailCreation.isFailure()) {
      return failure(emailCreation.value);
    }
    const email = emailCreation.value;
    return success(
      new User(UserId.create(plainData.id), {
        email,
        password: UserPassword.create(plainData.password)
      })
    );
  }
}
