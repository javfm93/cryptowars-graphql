import { ListWorldsQuery } from './ListWorldsQuery';
import { ListWorlds } from './ListWorlds';
import { Either } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../Users/Domain/Errors/DomainError';
import { Query } from '../../../../Shared/Domain/Query';
import { World } from '../../Domain/World';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';

export type ListWorldsQueryResult = Either<Array<World>, DomainError>;

export class ListWorldsQueryHandler
  implements QueryHandler<ListWorldsQuery, ListWorldsQueryResult>
{
  constructor(private createWorld: ListWorlds) {}

  subscribedTo(): Query {
    return ListWorldsQuery;
  }

  async handle(query: ListWorldsQuery): Promise<ListWorldsQueryResult> {
    return this.createWorld.execute();
  }
}
