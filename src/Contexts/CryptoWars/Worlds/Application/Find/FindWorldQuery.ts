import { Query } from '../../../../Shared/Domain/Query';

type Params = {
  id: string;
};

export class FindWorldQuery extends Query {
  id: string;

  constructor({ id }: Params) {
    super();
    this.id = id;
  }

  isEqualTo(query: FindWorldQuery): boolean {
    return this.id === query.id;
  }
}
