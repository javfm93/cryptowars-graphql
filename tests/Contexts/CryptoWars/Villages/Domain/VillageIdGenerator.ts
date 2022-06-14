import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { VillageId } from '../../../../../src/Contexts/CryptoWars/Villages/Domain/VillageId';

export class VillageIdGenerator {
  static create(value: string): VillageId {
    return VillageId.create(value);
  }

  static creator() {
    return () => VillageIdGenerator.random();
  }

  static random(): VillageId {
    return this.create(UuidGenerator.random().toString());
  }
}
