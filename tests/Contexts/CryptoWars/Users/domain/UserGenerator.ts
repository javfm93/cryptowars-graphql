import { UserIdGenerator } from './UserIdGenerator';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';
import { User } from '../../../../../src/Contexts/CryptoWars/Users/Domain/User';
import { CreateUserCommand } from '../../../../../src/Contexts/CryptoWars/Users/Application/Create/CreateUserCommand';
import { UserEmail } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserEmail';
import { UserPassword } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserPassword';
import { UserEmailGenerator } from './UserEmailGenerator';
import { UserPasswordGenerator } from './UserPasswordGenerator';

export class UserGenerator {
  static create(id: UserId, email: UserEmail, password: UserPassword): User {
    return User.create(id, { email, password });
  }

  static fromCommand(command: CreateUserCommand): User {
    return this.create(
      UserIdGenerator.create(command.id),
      UserEmailGenerator.create(command.email),
      UserPassword.create(command.password)
    );
  }

  static random(): User {
    return this.create(
      UserIdGenerator.random(),
      UserEmailGenerator.random(),
      UserPasswordGenerator.random()
    );
  }
}
