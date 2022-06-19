import { UserEmail } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserEmail';
import * as faker from 'faker';

export class UserEmailGenerator {
  static create(value: string): UserEmail {
    const emailCreation = UserEmail.create(value);
    return emailCreation.value as UserEmail;
  }

  static random(): UserEmail {
    return this.create(faker.internet.email());
  }

  static invalid(): string {
    return 'invalidEmail';
  }
}
