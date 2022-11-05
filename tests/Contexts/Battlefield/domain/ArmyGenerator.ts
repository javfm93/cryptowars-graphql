import { Army } from '../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { ArmyIdGenerator } from './ArmyIdGenerator';
import { ArmyId } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { TownId } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { TownIdGenerator } from '../../CryptoWars/Towns/domain/TownIdGenerator';
import { TownCreatedDomainEvent } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownCreatedDomainEvent';
import { PlayerId } from '../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerIdGenerator } from '../../CryptoWars/Players/domain/PlayerIdGenerator';

export class ArmyGenerator {
  static create(id: ArmyId, townId: TownId, playerId: PlayerId): Army {
    return Army.fromPrimitives({
      id: id.toString(),
      townId: townId.toString(),
      playerId: playerId.toString()
    });
  }

  static fromEvent(event: TownCreatedDomainEvent, id: ArmyId): Army {
    return this.create(id, TownId.create(event.aggregateId), PlayerId.create(event.playerId));
  }

  static random(): Army {
    return this.create(
      ArmyIdGenerator.random(),
      TownIdGenerator.random(),
      PlayerIdGenerator.random()
    );
  }

  static fromTown(townId: TownId): Army {
    return this.create(ArmyIdGenerator.random(), townId, PlayerIdGenerator.random());
  }
}
