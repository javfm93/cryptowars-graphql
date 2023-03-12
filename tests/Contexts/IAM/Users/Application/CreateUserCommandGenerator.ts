import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { CreateUserCommand } from '../../../../../src/Contexts/IAM/Users/Application/Create/CreateUserCommand';
import { UserPasswordGenerator } from '../Domain/UserPasswordGenerator';
import { UserEmailGenerator } from '../Domain/UserEmailGenerator';
import { UserNameGenerator } from '../Domain/UserNameGenerator';

export class CreateUserCommandGenerator {
  static create(id: string, email: string, password: string, username: string): CreateUserCommand {
    return new CreateUserCommand({ id, email, password, name: username });
  }

  static random(): CreateUserCommand {
    return this.create(
      UuidGenerator.random().toString(),
      UserEmailGenerator.random().toString(),
      UserPasswordGenerator.random().toString(),
      UserNameGenerator.random().toString()
    );
  }

  static withInvalidEmail(): CreateUserCommand {
    return this.create(
      UuidGenerator.random().toString(),
      UserEmailGenerator.invalid(),
      UserPasswordGenerator.random().toString(),
      UserNameGenerator.random().toString()
    );
  }

  static withInvalidPasswordDueTo = {
    whiteSpace: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withWhitespace(),
        UserNameGenerator.random().toString()
      ),
    length: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.invalidLength(),
        UserNameGenerator.random().toString()
      ),
    symbol: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutSymbol(),
        UserNameGenerator.random().toString()
      ),
    lowerCase: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutLowerCase(),
        UserNameGenerator.random().toString()
      ),
    upperCase: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutUpperCase(),
        UserNameGenerator.random().toString()
      ),
    digit: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutDigit(),
        UserNameGenerator.random().toString()
      )
  };

  static withInvalidName(): CreateUserCommand {
    return this.create(
      UuidGenerator.random().toString(),
      UserEmailGenerator.random().toString(),
      UserPasswordGenerator.random().toString(),
      UserNameGenerator.invalid()
    );
  }
}
