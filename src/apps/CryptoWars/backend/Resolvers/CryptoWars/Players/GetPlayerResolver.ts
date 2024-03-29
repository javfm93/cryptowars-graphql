import { Ctx, Query, Resolver } from 'type-graphql';
import { FindPlayerErrors } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayer';
import { FindPlayerQuery } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQuery';
import { FindPlayerQueryResult } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQueryHandler';
import { PlayerSchema } from '../../../../../../Contexts/CryptoWars/Players/Infrastructure/PlayerSchema';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { ServerContext } from '../../../server';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { NotFoundError } from '../../ResolverErrors';

@RegisterResolver()
@Resolver()
export class GetPlayerResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) {}

  @Authenticated()
  @Query(returns => PlayerSchema)
  async GetPlayer(@Ctx() context: ServerContext): Promise<PlayerSchema> {
    const userId = context.getUser().id;
    const query = new FindPlayerQuery({ userId, retrieveRelations: true });
    const result = await this.queryBus.ask<FindPlayerQueryResult>(query);
    if (result.isFailure()) throw this.handleError(result.value)
    return result.value.toPrimitives()
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
