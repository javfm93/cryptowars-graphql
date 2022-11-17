import { ListBattlesByArmyIdQuery } from './ListBattlesByArmyIdQuery';
import { ListBattlesByArmyId } from './ListBattlesByArmyId';
import { Either } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Battles } from '../../Domain/Battles';
import { ArmyId } from '../../../Armies/Domain/ArmyId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';

export type ListBattlesByArmyIdQueryResult = Either<Battles, DomainError>;

export class ListBattlesByArmyIdQueryHandler
  implements QueryHandler<ListBattlesByArmyIdQuery, ListBattlesByArmyIdQueryResult>
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
