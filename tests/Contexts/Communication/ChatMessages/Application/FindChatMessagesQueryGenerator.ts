import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';
import { FindChatMessagesQuery } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Find/FindChatMessagesQuery';
import { DirectChatIdGenerator } from '../../Chats/Domain/DirectChatIdGenerator';

export class FindChatMessagesQueryGenerator {
  static create(playerId: string, chatId: string): FindChatMessagesQuery {
    return new FindChatMessagesQuery(playerId, chatId);
  }

  static random(): FindChatMessagesQuery {
    return this.create(
      PlayerIdGenerator.random().toString(),
      DirectChatIdGenerator.random().toString()
    );
  }
}
