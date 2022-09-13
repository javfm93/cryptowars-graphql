import { Town, TownPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Town';
import { PlayerWorldSelectedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerWorldSelectedDomainEvent';
import { TownIdGenerator } from './TownIdGenerator';
import { PlayerIdGenerator } from '../../Players/domain/PlayerIdGenerator';

export class TownGenerator {
  static create(primitives: TownPrimitives): Town {
    return Town.fromPrimitives(primitives);
  }
  static fromEvent(event: PlayerWorldSelectedDomainEvent, id: string): Town {
    return this.create({ id, playerId: event.aggregateId });
  }

  static random(): Town {
    return this.create({
      id: TownIdGenerator.random().toString(),
      playerId: PlayerIdGenerator.random().toString()
    });
  }
}
