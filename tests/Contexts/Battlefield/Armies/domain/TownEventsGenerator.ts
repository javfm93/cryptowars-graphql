import { TownIdGenerator } from '../../../CryptoWars/Towns/Domain/TownIdGenerator';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/Domain/PlayerIdGenerator';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownCreatedDomainEvent';
import { TownSoldiersTrainFinished } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiersTrainFinishedDomainEvent';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';

export class TownEventsGenerator {
  static randomCreated() {
    return new TownCreatedDomainEvent({
      aggregateId: TownIdGenerator.random().toString(),
      attributes: {
        playerId: PlayerIdGenerator.random().toString()
      }
    });
  }

  static randomSoldiersTrainFinishedFor(army: Army): TownSoldiersTrainFinished {
    // @ts-ignore
    const soldiers: TownSoldiersPrimitives = {
      basic: NumberGenerator.randomBetween1and9()
      // range: 0
    };

    return new TownSoldiersTrainFinished({
      aggregateId: army.townId.toString(),
      attributes: {
        soldiers
      }
    });
  }
}
