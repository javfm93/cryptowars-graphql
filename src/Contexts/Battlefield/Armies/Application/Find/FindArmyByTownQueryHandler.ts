import { FindArmyByTownQuery } from './FindArmyByTownQuery';
import { FindArmyByTown, FindArmyErrors } from './FindArmyByTown';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Army } from '../../Domain/Army';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';

export type FindArmyQueryResult = Either<Army, FindArmyErrors>;

export class FindArmyByTownQueryHandler
  implements QueryHandler<FindArmyByTownQuery, FindArmyQueryResult>
{
  constructor(private findArmyByTownId: FindArmyByTown) {}

  subscribedTo(): Query {
    return FindArmyByTownQuery;
  }

  async handle(query: FindArmyByTownQuery): Promise<FindArmyQueryResult> {
    const playerId = PlayerId.create(query.playerId);
    const townId = TownId.create(query.townId);
    return this.findArmyByTownId.execute({ playerId, townId });
  }
}
