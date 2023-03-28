import { FindWorldQuery } from './FindWorldQuery';
import { FindWorld, FindWorldErrors } from './FindWorld';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler, RegisterQueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { World } from '../../Domain/World';
import { WorldId } from '../../Domain/WorldId';

export type FindWorldQueryErrors = FindWorldErrors;
export type FindWorldQueryResult = Either<World, FindWorldQueryErrors>;

@RegisterQueryHandler()
export class FindWorldQueryHandler implements QueryHandler<FindWorldQuery, FindWorldQueryResult> {
  constructor(private findWorld: FindWorld) {}

  subscribedTo(): Query {
    return FindWorldQuery;
  }

  async handle(query: FindWorldQuery): Promise<FindWorldQueryResult> {
    const worldId = WorldId.create(query.id);
    return this.findWorld.execute(worldId);
  }
}
