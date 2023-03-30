import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { FindArmyByTownQuery } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQuery';
import { FindArmyByTownQueryResult } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTownQueryHandler';
import { FindArmyErrors } from '../../../../../../Contexts/Battlefield/Armies/Application/Find/FindArmyByTown';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { BaseResolver, Resolver } from '../../Resolver';
import { Arg, Ctx, Query } from 'type-graphql';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { ServerContext } from '../../../server';
import { ForbiddenError, NotFoundError } from '../../ResolverErrors';
import { ArmySchema } from '../../../../../../Contexts/Battlefield/Armies/Infrastructure/Persistence/ArmySchema';

@Resolver()
export class GetArmyResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) {}

  @Authenticated()
  @Query(returns => ArmySchema)
  async GetArmy(@Arg('townId') townId: string, @Ctx() context: ServerContext): Promise<ArmySchema> {
    const { playerId } = context.getUser();
    const armyQuery = new FindArmyByTownQuery({ townId, playerId });
    const result = await this.queryBus.ask<FindArmyByTownQueryResult>(armyQuery);

    if (result.isSuccess()) {
      return result.value.toPrimitives();
    } else {
      throw this.handleError(result.value);
    }
  }

  private handleError(error: FindArmyErrors) {
    const errorName = error.errorName();
    switch (errorName) {
      case 'ArmyNotFound':
        return new NotFoundError(error.message);
      case 'Forbidden':
        return new ForbiddenError(error.message);
      default:
        assertNeverHappen(errorName);
    }
  }
}
