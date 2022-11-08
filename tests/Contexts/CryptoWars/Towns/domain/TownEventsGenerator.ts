import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';
import { TownSoldiersTrainFinished } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldierTrainFinishedDomainEvent';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';

export class TownEventsGenerator {
  static created(townId: TownId, playerId: PlayerId): TownCreatedDomainEvent {
    return new TownCreatedDomainEvent({ id: townId.toString(), playerId: playerId.toString() });
  }

  static soldierTrainFinished(
    townId: string,
    soldiers: TownSoldiersPrimitives
  ): TownSoldiersTrainFinished {
    return new TownSoldiersTrainFinished({ id: townId, soldiers: soldiers });
  }
}
