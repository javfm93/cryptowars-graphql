import { FindArmyByTownQuery } from './FindArmyByTownQuery';
import { FindArmyByTown, FindArmyErrors } from './FindArmyByTown';
import { Either } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { QueryHandler } from '../../../../Shared/Domain/QueryHandler';
import { Army } from '../../Domain/Army';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

export type FindArmyByTownQueryResult = Either<Army, FindArmyErrors>;

export class FindArmyByTownQueryHandler
  implements QueryHandler<FindArmyByTownQuery, FindArmyByTownQueryResult>
{
  constructor(private findArmyByTownId: FindArmyByTown) {}

  subscribedTo(): Query {
    return FindArmyByTownQuery;
  }

  async handle(query: FindArmyByTownQuery): Promise<FindArmyByTownQueryResult> {
    logger.debug(`Searching Army for town ${query.townId}`);
    const playerId = PlayerId.create(query.playerId);
    const townId = TownId.create(query.townId);
    return this.findArmyByTownId.execute({ playerId, townId });
  }
}
