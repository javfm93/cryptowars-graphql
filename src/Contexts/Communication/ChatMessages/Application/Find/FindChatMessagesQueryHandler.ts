import { FindChatMessagesQuery } from './FindChatMessagesQuery';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler, RegisterQueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { DirectChatId } from '../../../Chats/Domain/DirectChatId';
import { FindChatMessages } from './FindChatMessages';
import { ChatMessages } from '../../Domain/ChatMessages';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';

export type FindDirectChatMessagesQueryResult = Either<ChatMessages, Forbidden>;

@RegisterQueryHandler()
export class FindChatMessagesQueryHandler
  implements QueryHandler<FindChatMessagesQuery, FindDirectChatMessagesQueryResult>
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
