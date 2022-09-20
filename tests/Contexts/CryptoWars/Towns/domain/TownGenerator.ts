import { Town, TownPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Town';
import { PlayerWorldSelectedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerWorldSelectedDomainEvent';
import { TownIdGenerator } from './TownIdGenerator';
import { PlayerIdGenerator } from '../../Players/domain/PlayerIdGenerator';
import { NumberGenerator } from '../../../Shared/domain/NumberGenerator';
import { Towns } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Towns';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownBuildings } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownBuildings';

export class TownGenerator {
  static create(primitives: TownPrimitives): Town {
    return Town.fromPrimitives(primitives);
  }
  static fromEvent(event: PlayerWorldSelectedDomainEvent, id: string): Town {
    return this.create({
      id,
      playerId: event.aggregateId,
      buildings: TownBuildings.createInitialBuildings().value
    });
  }

  static random(): Town {
    return this.create({
      id: TownIdGenerator.random().toString(),
      playerId: PlayerIdGenerator.random().toString(),
      buildings: TownBuildings.createInitialBuildings().value
    });
  }

  static randomFor(playerId: PlayerId): Town {
    return this.create({
      id: TownIdGenerator.random().toString(),
      playerId: playerId.toString(),
      buildings: TownBuildings.createInitialBuildings().value
    });
  }

  static multipleRandomFor(playerId: PlayerId): Towns {
    const towns = Array.from({ length: NumberGenerator.randomBetween1and10() }, () =>
      this.randomFor(playerId)
    );
    return Towns.create(towns);
  }
}
