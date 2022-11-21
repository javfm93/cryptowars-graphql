import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';
import {
  World,
  WorldCreationProps
} from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/World';
import { WorldNameGenerator } from './WorldNameGenerator';
import { WorldIdGenerator } from './WorldIdGenerator';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';
import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import { Players } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Players';
import { TownGenerator } from '../../Towns/Domain/TownGenerator';
import { PlayerGenerator } from '../../Players/Domain/PlayerGenerator';

export class WorldGenerator {
  static create(id: WorldId, props: WorldCreationProps): World {
    return World.create(id, props);
  }

  static random(): World {
    const worldId = WorldIdGenerator.random();
    const players = PlayerGenerator.multipleRandom();
    return this.create(worldId, {
      name: WorldNameGenerator.random(),
      players,
      towns: TownGenerator.multipleRandomFor(players.getItems()[0].id, worldId)
    });
  }

  static empty(): World {
    const worldId = WorldIdGenerator.random();
    return this.create(worldId, {
      name: WorldNameGenerator.random()
    });
  }

  static withPlayers(players: Players): World {
    const worldId = WorldIdGenerator.random();
    return this.create(worldId, {
      name: WorldNameGenerator.random(),
      players,
      towns: TownGenerator.multipleRandomFor(players.getItems()[0].id, worldId)
    });
  }

  static multipleRandom(): Worlds {
    const words = Array.from({ length: NumberGenerator.randomBetween1and9() }, () => this.random());
    return Worlds.create(words);
  }
}
