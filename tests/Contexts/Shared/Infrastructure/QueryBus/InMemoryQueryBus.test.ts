import { Query } from '../../../../../src/Contexts/Shared/Domain/Query';
import { QueryHandlersInformation } from '../../../../../src/Contexts/Shared/Infrastructure/QueryBus/QueryHandlersInformation';
import { QueryNotRegisteredError } from '../../../../../src/Contexts/Shared/Domain/QueryNotRegisteredError';
import { BaseQueryHandler } from '../../../../../src/Contexts/Shared/Domain/BaseQueryHandler';
import { Response } from '../../../../../src/Contexts/Shared/Domain/Response';
import { InMemoryQueryBus } from '../../../../../src/Contexts/Shared/Infrastructure/QueryBus/InMemoryQueryBus';

class UnhandledQuery extends Query {
  static QUERY_NAME = 'unhandled.query';
}

class HandledQuery extends Query {
  static QUERY_NAME = 'handled.query';
}

class MyQueryHandler implements BaseQueryHandler<Query, Response> {
  subscribedTo(): HandledQuery {
    return HandledQuery;
  }

  async handle(query: HandledQuery): Promise<Response> {
    return {};
  }
}

describe('InMemoryQueryBus', () => {
  it('throws an error if dispatches a query without handler', async () => {
    const unhandledQuery = new UnhandledQuery();
    const queryHandlersInformation = new QueryHandlersInformation([]);
    const queryBus = new InMemoryQueryBus(queryHandlersInformation);

    try {
      await queryBus.ask(unhandledQuery);
      fail("Didn't throw");
    } catch (error) {
      expect(error).toStrictEqual(new QueryNotRegisteredError(unhandledQuery));
    }
  });

  it('accepts a query with handler', async () => {
    const handledQuery = new HandledQuery();
    const myQueryHandler = new MyQueryHandler();
    const queryHandlersInformation = new QueryHandlersInformation([myQueryHandler]);
    const queryBus = new InMemoryQueryBus(queryHandlersInformation);

    await queryBus.ask(handledQuery);
  });
});
