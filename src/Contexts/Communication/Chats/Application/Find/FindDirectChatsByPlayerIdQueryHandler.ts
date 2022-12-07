import { FindDirectChatsByPlayerIdQuery } from './FindDirectChatsByPlayerIdQuery';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { FindDirectChatsByPlayerId } from './FindDirectChatsByPlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { DirectChats } from '../../Domain/DirectChats';

export type FindDirectChatsQueryResult = Either<DirectChats, Forbidden>;

export class FindDirectChatsByPlayerIdQueryHandler
  implements QueryHandler<FindDirectChatsByPlayerIdQuery, FindDirectChatsQueryResult>
{
  constructor(private findChatsByPlayerId: FindDirectChatsByPlayerId) {}

  subscribedTo(): Query {
    return FindDirectChatsByPlayerIdQuery;
  }

  async handle(query: FindDirectChatsByPlayerIdQuery): Promise<FindDirectChatsQueryResult> {
    const playerId = PlayerId.create(query.playerId);
    return this.findChatsByPlayerId.execute({ playerId });
  }
}
