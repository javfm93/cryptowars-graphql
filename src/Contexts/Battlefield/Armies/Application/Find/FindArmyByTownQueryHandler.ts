import { FindArmyByTownQuery } from './FindArmyByTownQuery';
import { FindArmyByTown, FindArmyErrors } from './FindArmyByTown';
import { Result } from '../../../../Shared/Aplication/Result';
import { Query } from '../../../../Shared/Domain/Query';
import { BaseQueryHandler, QueryHandler } from '../../../../Shared/Domain/BaseQueryHandler';
import { Army } from '../../Domain/Army';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

export type FindArmyByTownQueryResult = Result<Army, FindArmyErrors>;

@QueryHandler()
export class FindArmyByTownQueryHandler
  implements BaseQueryHandler<FindArmyByTownQuery, FindArmyByTownQueryResult>
{
  constructor(private findArmyByTownId: FindArmyByTown) {}

  subscribedTo(): Query {
    return FindArmyByTownQuery;
  }

  async handle(query: FindArmyByTownQuery): Promise<FindArmyByTownQueryResult> {
    logger.debug(`Queried Army for town ${query.townId}`);
    const playerId = PlayerId.create(query.playerId);
    const townId = TownId.create(query.townId);
    return this.findArmyByTownId.execute({ playerId, townId });
  }
}
