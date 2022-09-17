import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import { World } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { WorldName } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldName';
import { WorldNameGenerator } from './WorldNameGenerator';
import { WorldIdGenerator } from './WorldIdGenerator';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';
import { NumberGenerator } from '../../../Shared/domain/NumberGenerator';

export class WorldGenerator {
  static create(id: WorldId, name: WorldName): World {
    return World.create(id, { name });
  }

  static random(): World {
    return this.create(WorldIdGenerator.random(), WorldNameGenerator.random());
  }

  static multipleRandom(): Worlds {
    const words = Array.from({ length: NumberGenerator.randomBetween1and10() }, () =>
      this.random()
    );
    return Worlds.create(words);
  }
}
