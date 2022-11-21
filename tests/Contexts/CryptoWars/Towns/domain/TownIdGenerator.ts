import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownId';

export class TownIdGenerator {
  static create(value: string): TownId {
    return TownId.create(value);
  }

  static creator() {
    return () => TownIdGenerator.random();
  }

  static random(): TownId {
    return this.create(UuidGenerator.random().toString());
  }
}
