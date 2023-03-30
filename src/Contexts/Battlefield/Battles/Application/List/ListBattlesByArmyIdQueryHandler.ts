import { ListBattlesByArmyIdQuery } from './ListBattlesByArmyIdQuery';
import { ListBattlesByArmyId, ListBattlesByArmyIdErrors } from './ListBattlesByArmyId';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { Battles } from '../../Domain/Battles';
import { ArmyId } from '../../../Armies/Domain/ArmyId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';

export type ListBattlesByArmyIdQueryErrors = ListBattlesByArmyIdErrors;
export type ListBattlesByArmyIdQueryResult = Result<Battles, ListBattlesByArmyIdQueryErrors>;

@QueryHandler()
export class ListBattlesByArmyIdQueryHandler
  implements BaseQueryHandler<ListBattlesByArmyIdQuery, ListBattlesByArmyIdQueryResult>
{
  constructor(private listBattles: ListBattlesByArmyId) {}

  subscribedTo(): Query {
    return ListBattlesByArmyIdQuery;
  }

  async handle(query: ListBattlesByArmyIdQuery): Promise<ListBattlesByArmyIdQueryResult> {
    const armyId = ArmyId.create(query.armyId);
    const playerId = PlayerId.create(query.playerId);
    return this.listBattles.execute({ armyId, playerId });
  }
}
