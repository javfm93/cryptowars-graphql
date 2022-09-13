import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';

export class TownCreatedEventGenerator {
  static create(playerId: PlayerId): TownCreatedDomainEvent {
    return new TownCreatedDomainEvent({ id: playerId.toString(), playerId: playerId.toString() });
  }
}
