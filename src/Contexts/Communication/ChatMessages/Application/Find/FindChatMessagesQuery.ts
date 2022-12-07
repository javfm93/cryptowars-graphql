import { Query } from '../../../../Shared/Domain/Query';

export class FindChatMessagesQuery extends Query {
  constructor(readonly playerId: string, readonly chatId: string) {
    super();
  }
}
