import { Query, Resolver } from 'type-graphql';
import { ListWorldsQuery } from '../../../../../../Contexts/CryptoWars/Worlds/Application/List/ListWorldsQuery';
import { ListWorldsQueryResult } from '../../../../../../Contexts/CryptoWars/Worlds/Application/List/ListWorldsQueryHandler';
import { QueryBus } from '../../../../../../Contexts/Shared/Domain/QueryBus';
import { BaseResolver, RegisterResolver } from '../../Resolver';
import { WorldsResponse } from './GetWorldsResponse';

@RegisterResolver()
@Resolver()
export class GetWorldsResolver implements BaseResolver {
  constructor(private queryBus: QueryBus) {}

  @Query(returns => WorldsResponse)
  async GetWorlds(): Promise<WorldsResponse> {
    const listWorldsQuery = new ListWorldsQuery();
    const result = await this.queryBus.ask<ListWorldsQueryResult>(listWorldsQuery);
    if (result.isSuccess()) {
      return { worlds: result.value.toPrimitives() };
    } else {
      throw new Error('error not handled');
    }
  }
}
