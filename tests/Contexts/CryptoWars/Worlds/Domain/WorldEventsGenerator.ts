import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { WorldPlayerJoinedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldPlayerJoinedDomainEvent';
import { WorldId } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/WorldId';

export class WorldEventsGenerator {
  static worldJoined(playerId: PlayerId, worldId: WorldId): WorldPlayerJoinedDomainEvent {
    return new WorldPlayerJoinedDomainEvent({
      aggregateId: worldId.toString(),
      attributes: {
        playerId: playerId.toString()
      }
    });
  }
}
