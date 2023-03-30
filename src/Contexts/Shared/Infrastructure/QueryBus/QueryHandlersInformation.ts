import { Query } from '../../Domain/Query';
import { BaseQueryHandler } from '../../Domain/BaseQueryHandler';
import { Response } from '../../Domain/Response';
import { QueryNotRegisteredError } from '../../Domain/QueryNotRegisteredError';

export class QueryHandlersInformation {
  private queryHandlersMap: Map<Query, BaseQueryHandler<Query, Response>>;

  constructor(queryHandlers: Array<BaseQueryHandler<Query, Response>>) {
    this.queryHandlersMap = this.formatHandlers(queryHandlers);
  }

  private formatHandlers(
    queryHandlers: Array<BaseQueryHandler<Query, Response>>
  ): Map<Query, BaseQueryHandler<Query, Response>> {
    const handlersMap = new Map();

    queryHandlers.forEach(queryHandler => {
      handlersMap.set(queryHandler.subscribedTo(), queryHandler);
    });

    return handlersMap;
  }

  public search(query: Query): BaseQueryHandler<Query, Response> {
    const queryHandler = this.queryHandlersMap.get(query.constructor);

    if (!queryHandler) {
      throw new QueryNotRegisteredError(query);
    }

    return queryHandler;
  }
}
