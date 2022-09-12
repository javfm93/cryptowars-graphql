import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';

export class UserIdGenerator {
  static create(value: string): UserId {
    return UserId.create(value);
  }

  static random(): UserId {
    return this.create(UuidGenerator.random().toString());
  }
}
