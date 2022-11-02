import { WorldName } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldName';
import * as faker from 'faker';

export class WorldNameGenerator {
  static create(value: string): WorldName {
    const nameCreation = WorldName.create(value);
    return nameCreation.value as WorldName;
  }

  static random(): WorldName {
    return this.create(faker.random.words(3));
  }
}
