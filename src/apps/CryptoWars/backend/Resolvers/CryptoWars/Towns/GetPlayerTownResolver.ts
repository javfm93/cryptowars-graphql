import { Arg, Ctx, Query } from 'type-graphql';
import { FindPlayerErrors } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayer';
import { FindPlayerQuery } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQuery';
import { FindPlayerQueryResult } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQueryHandler';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { ServerContext } from '../../../server';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { BaseResolver, Resolver } from '../../Resolver';
import { ForbiddenError, NotFoundError } from '../../ResolverErrors';
import { Town } from './GetPlayerTownResponse';

@Resolver()
export class GetPlayerTownsResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) { }

  @Authenticated()
  @Query(returns => Town)
  async GetPlayerTown(@Ctx() context: ServerContext, @Arg('id') id: string): Promise<Town> {
    const userId = context.getUser().id;
    const query = new FindPlayerQuery({ userId, retrieveRelations: true });
    const result = await this.queryBus.ask<FindPlayerQueryResult>(query);
    if (result.isFailure()) throw this.handleError(result.value)
    const town = result.value.toPrimitives().towns.find(town => town.id === id)
    if (!town) throw new ForbiddenError(`You don't have access to this town`)
    return town
  }

  private handleError(error: FindPlayerErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'PlayerNotFoundError':
        return new NotFoundError(error.message);
      default:
        throw new UnreachableCaseError(errorName);
    }
  }
}
