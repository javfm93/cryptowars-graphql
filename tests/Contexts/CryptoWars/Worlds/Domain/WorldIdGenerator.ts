import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';

export class WorldIdGenerator {
  static create(value: string): WorldId {
    return WorldId.create(value);
  }

  static random(): WorldId {
    return this.create(UuidGenerator.random().toString());
  }
}
