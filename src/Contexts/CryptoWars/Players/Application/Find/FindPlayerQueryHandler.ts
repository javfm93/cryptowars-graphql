import { FindPlayerQuery } from './FindPlayerQuery';
import { FindPlayer, FindPlayerErrors } from './FindPlayer';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler, RegisterQueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Player } from '../../Domain/Player';
import { UserId } from '../../../../IAM/Users/Domain/UserId';

export type FindPlayerQueryResult = Either<Player, FindPlayerErrors>;

@RegisterQueryHandler()
export class FindPlayerQueryHandler
  implements QueryHandler<FindPlayerQuery, FindPlayerQueryResult>
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
