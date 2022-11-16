import { Query } from '../../../../Shared/Domain/Query';

type Params = {
  userId: string;
  retrieveRelations: boolean;
};

export class FindPlayerQuery extends Query {
  userId: string;
  retrieveRelations: boolean;

  constructor({ userId, retrieveRelations }: Params) {
    super();
    this.userId = userId;
    this.retrieveRelations = retrieveRelations;
  }

  isEqualTo(query: FindPlayerQuery): boolean {
    return this.userId === query.userId;
  }
}
