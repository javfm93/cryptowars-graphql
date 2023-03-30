import { FindDirectChatsByPlayerIdQuery } from './FindDirectChatsByPlayerIdQuery';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { FindDirectChatsByPlayerId } from './FindDirectChatsByPlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { DirectChats } from '../../Domain/DirectChats';

export type FindDirectChatsQueryResult = Result<DirectChats, Forbidden>;

@QueryHandler()
export class FindDirectChatsByPlayerIdQueryHandler
  implements BaseQueryHandler<FindDirectChatsByPlayerIdQuery, FindDirectChatsQueryResult>
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
