import { QueryBus } from '../../../../src/Contexts/Shared/Domain/QueryBus';
import { Response } from '../../../../src/Contexts/Shared/Domain/Response';
import { Query, QueryResult } from '../../../../src/Contexts/Shared/Domain/Query';

export class QueryBusMock implements QueryBus {
  private mockAsk = jest.fn();

  ask<R extends Response>(query: Query): Promise<R> {
    return this.mockAsk(query);
  }

  whenAskThenReturn<Result, Errors>(response: QueryResult<Result, Errors>): void {
    this.mockAsk.mockResolvedValueOnce(response);
  }
}
