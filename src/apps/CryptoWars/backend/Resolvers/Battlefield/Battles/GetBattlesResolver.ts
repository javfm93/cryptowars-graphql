import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { ListBattlesByArmyIdQuery } from '../../../../../../Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyIdQuery';
import { ListBattlesByArmyIdQueryResult } from '../../../../../../Contexts/Battlefield/Battles/Application/List/ListBattlesByArmyIdQueryHandler';
import { BaseResolver, Resolver } from '../../Resolver';
import { Authenticated } from '../../IAM/Auth/AuthChecker';
import { Arg, Ctx, Query } from 'type-graphql';
import { ServerContext } from '../../../server';
import { ForbiddenError, NotFoundError } from '../../ResolverErrors';
import { assertNeverHappen } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { Battles } from './GetBattlesResponse';
import { ErrorsOf } from '../../../../../../Contexts/Shared/Aplication/Result';

@Resolver()
export class GetBattlesResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) {}

  @Authenticated()
  @Query(returns => Battles)
  async GetBattles(@Arg('armyId') armyId: string, @Ctx() context: ServerContext): Promise<Battles> {
    const { playerId } = context.getUser();
    const listBattlesQuery = new ListBattlesByArmyIdQuery(armyId, playerId);
    const result = await this.queryBus.ask<ListBattlesByArmyIdQueryResult>(listBattlesQuery);

    if (result.isSuccess()) {
      return { battles: result.value.toPrimitives() };
    } else {
      throw this.handleError(result.value);
    }
  }

  private handleError(error: ErrorsOf<ListBattlesByArmyIdQueryResult>) {
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
