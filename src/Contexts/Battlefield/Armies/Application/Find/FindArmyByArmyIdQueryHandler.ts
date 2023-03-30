import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { Army } from '../../Domain/Army';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ArmyId } from '../../Domain/ArmyId';
import { FindArmyByArmyId, FindArmyByArmyIdErrors } from './FindArmyByArmyId';
import { FindArmyByArmyIdQuery } from './FindArmyByArmyIdQuery';

export type FindArmyByArmyIdQueryResult = Result<Army, FindArmyByArmyIdErrors>;

@QueryHandler()
export class FindArmyByArmyIdQueryHandler
  implements BaseQueryHandler<FindArmyByArmyIdQuery, FindArmyByArmyIdQueryResult>
{
  constructor(private findArmyByArmyId: FindArmyByArmyId) {}

  subscribedTo(): Query {
    return FindArmyByArmyIdQuery;
  }

  async handle(query: FindArmyByArmyIdQuery): Promise<FindArmyByArmyIdQueryResult> {
    const playerId = PlayerId.create(query.playerId);
    const armyId = ArmyId.create(query.armyId);
    return this.findArmyByArmyId.execute({ playerId, armyId });
  }
}
