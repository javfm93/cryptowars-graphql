import * as faker from 'faker';
import { UserPassword } from '../../../../../src/Contexts/IAM/Users/Domain/UserPassword';

export class UserPasswordGenerator {
  static create(value: string): UserPassword {
    return UserPassword.fromPrimitives(value);
  }

  static random(): UserPassword {
    return this.create(
      faker.internet.password(2, false, /[A-Z]/) +
        faker.internet.password(2, false, /[a-z]/) +
        faker.internet.password(2, false, /[0-9]/) +
        faker.internet.password(2, false, /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]/)
    );
  }

  static withWhitespace(): string {
    return this.random() + ' ';
  }

  static invalidLength(): string {
    return (
      faker.internet.password(1, false, /[A-Z]/) +
      faker.internet.password(1, false, /[a-z]/) +
      faker.internet.password(1, false, /[0-9]/) +
      faker.internet.password(1, false, /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]/)
    );
  }

  static withoutSymbol(): string {
    return (
      faker.internet.password(4, false, /[A-Z]/) +
      faker.internet.password(2, false, /[a-z]/) +
      faker.internet.password(2, false, /[0-9]/)
    );
  }

  static withoutLowerCase(): string {
    return (
      faker.internet.password(4, false, /[A-Z]/) +
      faker.internet.password(2, false, /[0-9]/) +
      faker.internet.password(2, false, /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]/)
    );
  }

  static withoutUpperCase(): string {
    return (
      faker.internet.password(4, false, /[a-z]/) +
      faker.internet.password(2, false, /[0-9]/) +
      faker.internet.password(2, false, /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]/)
    );
  }

  static withoutDigit(): string {
    return (
      faker.internet.password(4, false, /[A-Z]/) +
      faker.internet.password(2, false, /[a-z]/) +
      faker.internet.password(2, false, /[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?_₹]/)
    );
  }
}
