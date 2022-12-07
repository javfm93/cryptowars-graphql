import { FindDirectChatsByPlayerIdQuery } from '../../../../../src/Contexts/Communication/Chats/Application/Find/FindDirectChatsByPlayerIdQuery';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';

export class FindDirectChatsByPlayerIdQueryGenerator {
  static create(playerId: string): FindDirectChatsByPlayerIdQuery {
    return new FindDirectChatsByPlayerIdQuery(playerId);
  }

  static random(): FindDirectChatsByPlayerIdQuery {
    return this.create(PlayerIdGenerator.random().toString());
  }
}
