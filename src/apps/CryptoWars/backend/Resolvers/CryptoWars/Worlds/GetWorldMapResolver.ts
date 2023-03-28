import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import {
  FindWorldQueryErrors,
  FindWorldQueryResult
} from '../../../../../../Contexts/CryptoWars/Worlds/Application/Find/FindWorldQueryHandler';
import { FindWorldQuery } from '../../../../../../Contexts/CryptoWars/Worlds/Application/Find/FindWorldQuery';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { Arg, Ctx, Query, Resolver } from 'type-graphql';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { NotFoundError } from '../../ResolverErrors';
import { ServerContext } from '../../../server';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';
import { WorldMapResponse } from './GetWorldMapResponse';

@RegisterResolver()
@Resolver()
export class GetWorldMapResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) {}

  @Authenticated()
  @Query(returns => WorldMapResponse)
  async GetWorldMap(
    @Arg('id') id: string,
    @Ctx() context: ServerContext
  ): Promise<WorldMapResponse> {
    const findWorldQuery = new FindWorldQuery({ id });
    const result = await this.queryBus.ask<FindWorldQueryResult>(findWorldQuery);
    if (result.isSuccess()) {
      return result.value.toMap();
    } else {
      throw this.handleError(result.value);
    }
  }

  private handleError(error: FindWorldQueryErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'WorldNotFoundError':
        return new NotFoundError(error.message);
      default:
        throw new UnreachableCaseError(errorName);
    }
  }
}
