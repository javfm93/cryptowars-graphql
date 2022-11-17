import { ListBattlesByArmyIdQuery } from '../../../../../src/Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyIdQuery';
import { ArmyIdGenerator } from '../../Armies/domain/ArmyIdGenerator';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';

export class ListBattlesByArmyIdQueryGenerator {
  static create(armyId: string, playerId: string): ListBattlesByArmyIdQuery {
    return new ListBattlesByArmyIdQuery(armyId, playerId);
  }

  static withDifferentPlayer(armyId: ArmyId): ListBattlesByArmyIdQuery {
    return this.create(armyId.toString(), PlayerIdGenerator.random().toString());
  }

  static random(): ListBattlesByArmyIdQuery {
    return this.create(ArmyIdGenerator.random().toString(), PlayerId.random().toString());
  }

  static from(army: Army): ListBattlesByArmyIdQuery {
    return this.create(army.id.toString(), army.playerId.toString());
  }
}
