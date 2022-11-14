import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { UserId } from '../../../../../src/Contexts/IAM/Users/Domain/UserId';

export class AttackIdGenerator {
  static create(value: string): UserId {
    return UserId.create(value);
  }

  static random(): UserId {
    return this.create(UuidGenerator.random().toString());
  }
}
