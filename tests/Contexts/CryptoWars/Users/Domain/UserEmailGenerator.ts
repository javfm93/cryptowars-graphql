import { UserEmail } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserEmail';
import * as faker from 'faker';

export class UserEmailGenerator {
  static create(value: string): UserEmail {
    return UserEmail.create(value);
  }

  static random(): UserEmail {
    return this.create(faker.internet.email());
  }

  static invalid(): string {
    return 'invalidEmail';
  }
}
