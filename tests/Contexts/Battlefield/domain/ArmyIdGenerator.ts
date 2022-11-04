import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';

export class PlayerIdGenerator {
  static create(value: string): PlayerId {
    return PlayerId.create(value);
  }

  static random(): PlayerId {
    return this.create(UuidGenerator.random().toString());
  }
}
