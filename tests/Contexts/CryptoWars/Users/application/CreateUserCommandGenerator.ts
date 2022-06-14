import { UuidGenerator } from '../../../Shared/domain/UuidGenerator';
import { CreateUserCommand } from '../../../../../src/Contexts/CryptoWars/Users/Application/Create/CreateUserCommand';
import { UserPasswordGenerator } from '../domain/UserPasswordGenerator';
import { UserEmailGenerator } from '../domain/UserEmailGenerator';

export class CreateUserCommandGenerator {
  static create(id: string, email: string, password: string): CreateUserCommand {
    return new CreateUserCommand({ id, email, password });
  }

  static random(): CreateUserCommand {
    return this.create(
      UuidGenerator.random().toString(),
      UserEmailGenerator.random().toString(),
      UserPasswordGenerator.random().toString()
    );
  }

  static withInvalidEmail(): CreateUserCommand {
    return this.create(
      UuidGenerator.random().toString(),
      UserEmailGenerator.invalid(),
      UserPasswordGenerator.random().toString()
    );
  }

  static withInvalidPasswordDueTo = {
    whiteSpace: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withWhitespace()
      ),
    length: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.invalidLength()
      ),
    symbol: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutSymbol()
      ),
    lowerCase: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutLowerCase()
      ),
    upperCase: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutUpperCase()
      ),
    digit: () =>
      this.create(
        UuidGenerator.random().toString(),
        UserEmailGenerator.random().toString(),
        UserPasswordGenerator.withoutDigit()
      )
  };
}
