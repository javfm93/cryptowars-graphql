import { Ctx, Query, Resolver } from 'type-graphql';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { FindPlayerQuery } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQuery';
import { FindPlayerQueryResult } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayerQueryHandler';
import { PlayerSchema } from '../../../../../../Contexts/CryptoWars/Players/Infrastructure/PlayerSchema';
import { ServerContext } from '../../../server';
import { FindPlayerErrors } from '../../../../../../Contexts/CryptoWars/Players/Application/Find/FindPlayer';
import { UnreachableCaseError } from '../../../../../../Contexts/Shared/Domain/Errors/UnreachableCaseError';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { resolverResult } from '../../ResolverResult';
import { NotFoundError } from '../../ResolverErrors';

const Result = resolverResult('GetPlayer', PlayerSchema, [NotFoundError]);

@RegisterResolver()
@Resolver()
export class GetPlayerResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) {}

  @Authenticated()
  @Query(returns => Result)
  async GetPlayer(@Ctx() context: ServerContext): Promise<typeof Result> {
    const userId = context.getUser().id;
    const query = new FindPlayerQuery({ userId, retrieveRelations: true });
    const result = await this.queryBus.ask<FindPlayerQueryResult>(query);
    return result.isSuccess() ? result.value.toPrimitives() : this.handleError(result.value);
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
