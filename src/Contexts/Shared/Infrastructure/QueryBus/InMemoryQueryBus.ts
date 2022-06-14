import { Query } from '../../Domain/Query';
import { Response } from '../../Domain/Response';
import { QueryBus } from '../../Domain/QueryBus';
import { QueryHandlersInformation } from './QueryHandlersInformation';

export class InMemoryQueryBus implements QueryBus {
  constructor(private queryHandlersInformation: QueryHandlersInformation) {}

  ask<R extends Response>(query: Query): Promise<R> {
    const handler = this.queryHandlersInformation.search(query);

    return handler.handle(query) as Promise<R>;
  }
}
