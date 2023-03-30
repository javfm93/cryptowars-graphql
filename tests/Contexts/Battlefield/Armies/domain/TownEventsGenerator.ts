import { TownIdGenerator } from '../../../CryptoWars/Towns/Domain/TownIdGenerator';
import { TownSoldiersPrimitives } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiers';
import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownCreatedDomainEvent';
import { TownSoldiersTrainFinished } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownSoldiersTrainFinishedDomainEvent';

export class TownEventsGenerator {
  static CreatedBy(playerId: string) {
    return new TownCreatedDomainEvent({
      aggregateId: TownIdGenerator.random().toString(),
      attributes: { playerId }
    });
  }

  static randomSoldiersTrainFinishedFor(townId: string): TownSoldiersTrainFinished {
    const soldiers: TownSoldiersPrimitives = {
      basic: NumberGenerator.randomBetween1and9(),
      range: NumberGenerator.randomBetween1and9()
    };

    return this.soldiersTrainFinishedFor(soldiers, townId);
  }

  static soldiersTrainFinishedFor(
    soldiers: TownSoldiersPrimitives,
    townId: string
  ): TownSoldiersTrainFinished {
    return new TownSoldiersTrainFinished({
      aggregateId: townId,
      attributes: {
        soldiers
      }
    });
  }
}
