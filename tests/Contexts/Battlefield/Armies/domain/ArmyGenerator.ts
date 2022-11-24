import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { ArmyIdGenerator } from './ArmyIdGenerator';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownId } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownId';
import { TownIdGenerator } from '../../../CryptoWars/Towns/Domain/TownIdGenerator';
import { TownCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Towns/Domain/TownCreatedDomainEvent';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/Domain/PlayerIdGenerator';
import { Squads } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';
import { SquadsGenerator } from './SquadsGenerator';

export class ArmyGenerator {
  static create(id: ArmyId, townId: TownId, playerId: PlayerId, squads: Squads): Army {
    return Army.fromPrimitives({
      id: id.toString(),
      townId: townId.toString(),
      playerId: playerId.toString(),
      squads: squads.value
    });
  }

  static fromEvent(event: TownCreatedDomainEvent, id: ArmyId): Army {
    return this.create(
      id,
      TownId.create(event.aggregateId),
      PlayerId.create(event.attributes.playerId),
      Squads.defaultSquads()
    );
  }

  static random(): Army {
    return this.create(
      ArmyIdGenerator.random(),
      TownIdGenerator.random(),
      PlayerIdGenerator.random(),
      SquadsGenerator.randomBetween10and90()
    );
  }

  static randomWithNSoldiers(soldiers: number): Army {
    return this.create(
      ArmyIdGenerator.random(),
      TownIdGenerator.random(),
      PlayerIdGenerator.random(),
      SquadsGenerator.withNSoldiers(soldiers)
    );
  }
}
