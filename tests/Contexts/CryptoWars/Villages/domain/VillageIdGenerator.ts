import { UuidGenerator } from '../../../Shared/domain/UuidGenerator';
import { VillageId } from '../../../../../src/Contexts/CryptoWars/Villages/domain/VillageId';

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
