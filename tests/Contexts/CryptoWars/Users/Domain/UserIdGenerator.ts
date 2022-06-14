import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { VillageId } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/VillageId';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';

export class UserIdGenerator {
  static create(value: string): UserId {
    return UserId.create(value);
  }

  static random(): VillageId {
    return this.create(UuidGenerator.random().toString());
  }
}
