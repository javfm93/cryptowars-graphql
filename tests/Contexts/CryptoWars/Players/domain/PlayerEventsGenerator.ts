import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerCreatedDomainEvent';
import { PlayerWorldSelectedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerWorldSelectedDomainEvent';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';

export class PlayerEventsGenerator {
  static PlayerCreated(playerId: PlayerId): PlayerCreatedDomainEvent {
    return new PlayerCreatedDomainEvent({ id: playerId.toString() });
  }

  static PlayerWorldSelected(playerId: PlayerId, worldId: WorldId): PlayerWorldSelectedDomainEvent {
    return new PlayerWorldSelectedDomainEvent({
      id: playerId.toString(),
      worldId: worldId.toString()
    });
  }
}
