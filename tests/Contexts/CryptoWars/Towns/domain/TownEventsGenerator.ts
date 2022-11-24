import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownCreatedDomainEvent';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownId';
import { TownSoldiersTrainStarted } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiersTrainStartedDomainEvent';

export class TownEventsGenerator {
  static created(townId: TownId, playerId: PlayerId): TownCreatedDomainEvent {
    return new TownCreatedDomainEvent({
      aggregateId: townId.toString(),
      attributes: {
        playerId: playerId.toString()
      }
    });
  }

  static soldierTrainStarted(
    townId: string,
    soldiers: TownSoldiersPrimitives
  ): TownSoldiersTrainStarted {
    return new TownSoldiersTrainStarted({ aggregateId: townId, attributes: { soldiers } });
  }
}
