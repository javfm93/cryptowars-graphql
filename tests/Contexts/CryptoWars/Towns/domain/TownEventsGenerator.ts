import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';
import { TownSoldierTrainFinished } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldierTrainFinishedDomainEvent';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';

export class TownEventsGenerator {
  static created(playerId: PlayerId): TownCreatedDomainEvent {
    return new TownCreatedDomainEvent({ id: playerId.toString(), playerId: playerId.toString() });
  }

  static soldierTrainFinished(
    townId: string,
    soldiers: TownSoldiersPrimitives
  ): TownSoldierTrainFinished {
    return new TownSoldierTrainFinished({ id: townId, soldiers: soldiers });
  }
}
