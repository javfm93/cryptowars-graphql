import { Town, TownPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/Town';
import { WorldPlayerJoinedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldPlayerJoinedDomainEvent';
import { TownIdGenerator } from './TownIdGenerator';
import { PlayerIdGenerator } from '../../Players/Domain/PlayerIdGenerator';
import { Towns } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/Towns';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownBuildings } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownBuildings';
import { WorldIdGenerator } from '../../Worlds/Domain/WorldIdGenerator';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';

export class TownGenerator {
  static create(primitives: TownPrimitives): Town {
    return Town.fromPrimitives(primitives);
  }

  static fromEvent(event: WorldPlayerJoinedDomainEvent, id: string): Town {
    return this.create({
      id,
      playerId: event.attributes.playerId,
      worldId: event.aggregateId,
      buildings: TownBuildings.createInitialBuildings().value
    });
  }

  static random(): Town {
    return this.create({
      id: TownIdGenerator.random().toString(),
      playerId: PlayerIdGenerator.random().toString(),
      worldId: WorldIdGenerator.random().toString(),
      buildings: TownBuildings.createInitialBuildings().value
    });
  }

  static randomFor(playerId: PlayerId, worldId: WorldId): Town {
    return this.create({
      id: TownIdGenerator.random().toString(),
      playerId: playerId.toString(),
      worldId: worldId.toString(),
      buildings: TownBuildings.createInitialBuildings().value
    });
  }

  static multipleRandomFor(playerId: PlayerId, worldId: WorldId): Towns {
    const towns = Array.from({ length: 2 }, () => this.randomFor(playerId, worldId));
    return Towns.create(towns);
  }
}
