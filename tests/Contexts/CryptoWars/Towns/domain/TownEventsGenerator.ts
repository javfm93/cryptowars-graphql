import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';
import { TownSoldierTrainFinished } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldierTrainFinishedDomainEvent';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { TownIdGenerator } from './TownIdGenerator';
import { PlayerIdGenerator } from '../../Players/domain/PlayerIdGenerator';

export class TownEventsGenerator {
  static created(townId: TownId, playerId: PlayerId): TownCreatedDomainEvent {
    return new TownCreatedDomainEvent({ id: townId.toString(), playerId: playerId.toString() });
  }

  static randomCreated() {
    return new TownCreatedDomainEvent({
      id: TownIdGenerator.random().toString(),
      playerId: PlayerIdGenerator.random().toString()
    });
  }

  static soldierTrainFinished(
    townId: string,
    soldiers: TownSoldiersPrimitives
  ): TownSoldierTrainFinished {
    return new TownSoldierTrainFinished({ id: townId, soldiers: soldiers });
  }
}
