import { ListWorldsQuery } from './ListWorldsQuery';
import { ListWorlds } from './ListWorlds';
import { Either } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler, RegisterQueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Worlds } from '../../Domain/Worlds';

export type ListWorldsQueryResult = Either<Worlds, DomainError>;

@RegisterQueryHandler()
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
