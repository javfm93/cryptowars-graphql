import { Query } from '../../../../Shared/Domain/Query';

type Params = {
  userId: string;
};

export class FindPlayerQuery extends Query {
  userId: string;

  constructor({ userId }: Params) {
    super();
    this.userId = userId;
  }

  isEqualTo(query: FindPlayerQuery): boolean {
    return this.userId === query.userId;
  }
}
