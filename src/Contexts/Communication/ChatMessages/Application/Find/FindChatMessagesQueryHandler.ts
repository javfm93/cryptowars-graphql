import { FindChatMessagesQuery } from './FindChatMessagesQuery';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { DirectChatId } from '../../../Chats/Domain/DirectChatId';
import { FindChatMessages } from './FindChatMessages';
import { ChatMessages } from '../../Domain/ChatMessages';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';

export type FindDirectChatMessagesQueryResult = Result<ChatMessages, Forbidden>;

@QueryHandler()
export class FindChatMessagesQueryHandler
  implements BaseQueryHandler<FindChatMessagesQuery, FindDirectChatMessagesQueryResult>
{
  constructor(private findMessagesByChatId: FindChatMessages) {}

  subscribedTo(): Query {
    return FindChatMessagesQuery;
  }

  async handle(query: FindChatMessagesQuery): Promise<FindDirectChatMessagesQueryResult> {
    const playerId = PlayerId.create(query.playerId);
    const chatId = DirectChatId.create(query.chatId);
    return this.findMessagesByChatId.execute({ playerId, chatId });
  }
}
