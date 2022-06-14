import { UuidGenerator } from '../../../Shared/domain/UuidGenerator';
import { VillageId } from '../../../../../src/Contexts/CryptoWars/Villages/domain/VillageId';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';

export class UserIdGenerator {
  static create(value: string): UserId {
    return UserId.create(value);
  }

  static random(): VillageId {
    return this.create(UuidGenerator.random().toString());
  }
}
