import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerCreatedDomainEvent';

export class PlayerEventsGenerator {
  static PlayerCreated(playerId: PlayerId): PlayerCreatedDomainEvent {
    return new PlayerCreatedDomainEvent({ aggregateId: playerId.toString() });
  }
}
