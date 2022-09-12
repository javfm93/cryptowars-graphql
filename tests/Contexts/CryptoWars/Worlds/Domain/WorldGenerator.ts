import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { World } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { WorldName } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldName';
import { WorldNameGenerator } from './WorldNameGenerator';
import { WorldIdGenerator } from './WorldIdGenerator';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';

export class WorldGenerator {
  static generateRandomNumberBetween1and10 = () => parseInt((Math.random() * 10).toFixed(0));

  static create(id: WorldId, name: WorldName): World {
    return World.create(id, { name });
  }

  static random(): World {
    return this.create(WorldIdGenerator.random(), WorldNameGenerator.random());
  }

  static multipleRandom(): Worlds {
    const words = Array.from({ length: this.generateRandomNumberBetween1and10() }, () =>
      this.random()
    );
    return Worlds.create(words);
  }
}
