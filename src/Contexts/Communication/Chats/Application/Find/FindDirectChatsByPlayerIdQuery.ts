import { Query } from '../../../../Shared/Domain/Query';

export class FindDirectChatsByPlayerIdQuery extends Query {
  constructor(readonly playerId: string) {
    super();
  }
}
