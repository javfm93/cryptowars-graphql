import { FindPlayerQuery } from './FindPlayerQuery';
import { FindPlayer, FindPlayerErrors } from './FindPlayer';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { Player } from '../../Domain/Player';
import { UserId } from '../../../../IAM/Users/Domain/UserId';

export type FindPlayerQueryResult = Result<Player, FindPlayerErrors>;

@QueryHandler()
export class FindPlayerQueryHandler
  implements BaseQueryHandler<FindPlayerQuery, FindPlayerQueryResult>
{
  constructor(private findPlayer: FindPlayer) {}

  subscribedTo(): Query {
    return FindPlayerQuery;
  }

  async handle(query: FindPlayerQuery): Promise<FindPlayerQueryResult> {
    const userId = UserId.create(query.userId);
    const retrieveRelations = query.retrieveRelations;
    return this.findPlayer.execute({ userId, retrieveRelations });
  }
}
