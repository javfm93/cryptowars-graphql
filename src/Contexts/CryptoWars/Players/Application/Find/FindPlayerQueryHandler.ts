import { FindPlayerQuery } from './FindPlayerQuery';
import { FindPlayer } from './FindPlayer';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Player } from '../../Domain/Player';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { UserId } from '../../../../IAM/Users/Domain/UserId';

export type FindPlayerQueryResult = Either<Player, DomainError>;

export class FindPlayerQueryHandler
  implements QueryHandler<FindPlayerQuery, FindPlayerQueryResult>
{
  constructor(private findPlayer: FindPlayer) {}

  subscribedTo(): Query {
    return FindPlayerQuery;
  }

  async handle(query: FindPlayerQuery): Promise<FindPlayerQueryResult> {
    const userId = UserId.create(query.userId);
    return this.findPlayer.execute(userId);
  }
}
