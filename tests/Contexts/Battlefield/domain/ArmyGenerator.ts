import { Army } from '../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { ArmyIdGenerator } from './ArmyIdGenerator';
import { ArmyId } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownId } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { TownIdGenerator } from '../../CryptoWars/Towns/domain/TownIdGenerator';
import { TownCreatedDomainEvent } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';

export class ArmyGenerator {
  static create(id: ArmyId, townId: TownId): Army {
    return Army.fromPrimitives({
      id: id.toString(),
      townId: townId.toString()
    });
  }

  static fromEvent(event: TownCreatedDomainEvent, id: ArmyId): Army {
    return this.create(id, TownId.create(event.aggregateId));
  }

  static random(): Army {
    return this.create(ArmyIdGenerator.random(), TownIdGenerator.random());
  }

  static fromTown(townId: TownId): Army {
    return this.create(ArmyIdGenerator.random(), townId);
  }
}
