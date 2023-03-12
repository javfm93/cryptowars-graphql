import { UserName } from '../../../../../src/Contexts/IAM/Users/Domain/UserName';
import * as faker from 'faker';

export class UserNameGenerator {
  static create(value: string): UserName {
    return UserName.fromPrimitives(value);
  }

  static random(): UserName {
    return this.create(faker.internet.userName());
  }

  static invalid(): string {
    return 'invalidname@';
  }
}
