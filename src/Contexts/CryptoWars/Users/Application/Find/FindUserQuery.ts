import { Query } from '../../../../Shared/Domain/Query';

type Params = {
  id: string;
};

export class FindUserQuery extends Query {
  id: string;

  constructor({ id }: Params) {
    super();
    this.id = id;
  }
}
