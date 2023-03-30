import { FindWorldQuery } from './FindWorldQuery';
import { FindWorld, FindWorldErrors } from './FindWorld';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { World } from '../../Domain/World';
import { WorldId } from '../../Domain/WorldId';

export type FindWorldQueryErrors = FindWorldErrors;
export type FindWorldQueryResult = Result<World, FindWorldQueryErrors>;

@QueryHandler()
export class FindWorldQueryHandler
  implements BaseQueryHandler<FindWorldQuery, FindWorldQueryResult>
{
  constructor(private findWorld: FindWorld) {}

  subscribedTo(): Query {
    return FindWorldQuery;
  }

  async handle(query: FindWorldQuery): Promise<FindWorldQueryResult> {
    const worldId = WorldId.create(query.id);
    return this.findWorld.execute(worldId);
  }
}
