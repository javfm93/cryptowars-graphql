import { ListWorldsQuery } from './ListWorldsQuery';
import { ListWorlds } from './ListWorlds';
import { Result } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { Worlds } from '../../Domain/Worlds';

export type ListWorldsQueryResult = Result<Worlds, DomainError>;

@QueryHandler()
export class ListWorldsQueryHandler
  implements BaseQueryHandler<ListWorldsQuery, ListWorldsQueryResult>
{
  constructor(private createWorld: ListWorlds) {}

  subscribedTo(): Query {
    return ListWorldsQuery;
  }

  async handle(query: ListWorldsQuery): Promise<ListWorldsQueryResult> {
    return this.createWorld.execute();
  }
}
