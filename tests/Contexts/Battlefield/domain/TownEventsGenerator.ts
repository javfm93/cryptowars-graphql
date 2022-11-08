import { TownIdGenerator } from '../../CryptoWars/Towns/domain/TownIdGenerator';
import { PlayerIdGenerator } from '../../CryptoWars/Players/domain/PlayerIdGenerator';
import { TownSoldiersPrimitives } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldiers';
import { NumberGenerator } from '../../Shared/Domain/NumberGenerator';
import { TownCreatedDomainEvent } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';
import { TownSoldiersTrainFinished } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownSoldierTrainFinishedDomainEvent';
import { Army } from '../../../../src/Contexts/Battlefield/Armies/Domain/Army';

export class TownEventsGenerator {
  static randomCreated() {
    return new TownCreatedDomainEvent({
      id: TownIdGenerator.random().toString(),
      playerId: PlayerIdGenerator.random().toString()
    });
  }

  static randomSoldiersTrainFinishedFor(army: Army): TownSoldiersTrainFinished {
    const soldiers: TownSoldiersPrimitives = { basic: NumberGenerator.randomBetween1and10() };

    return new TownSoldiersTrainFinished({
      id: army.townId.toString(),
      soldiers
    });
  }
}
