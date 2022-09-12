import { FindWorldQuery } from './FindWorldQuery';
import { FindWorld } from './FindWorld';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { World } from '../../Domain/World';
import { WorldId } from '../../Domain/WorldId';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export type FindWorldQueryResult = Either<World, DomainError>;

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
