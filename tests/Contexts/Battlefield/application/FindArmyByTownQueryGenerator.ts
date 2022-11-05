import { FindArmyByTownQuery } from '../../../../src/Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQuery';
import { PlayerId } from '../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { TownId } from '../../../../src/Contexts/CryptoWars/Towns/domain/TownId';
import { PlayerIdGenerator } from '../../CryptoWars/Players/domain/PlayerIdGenerator';
import { TownIdGenerator } from '../../CryptoWars/Towns/domain/TownIdGenerator';

export class FindArmyByTownQueryGenerator {
  static create(playerId: PlayerId, townId: TownId): FindArmyByTownQuery {
    return new FindArmyByTownQuery({ playerId: playerId.toString(), townId: townId.toString() });
  }

  static random(): FindArmyByTownQuery {
    return this.create(PlayerIdGenerator.random(), TownIdGenerator.random());
  }
}
