import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { RecruitSquad } from './RecruitSquad';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { TownSoldiersTrainFinished } from '../../../../CryptoWars/Towns/Domain/TownSoldiersTrainFinishedDomainEvent';
import { Squads } from '../../Domain/Squads';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';

export class RecruitSquadOnTownSoldiersTrainFinished
  implements DomainEventSubscriber<TownSoldiersTrainFinished>
{
  constructor(private recruitSquad: RecruitSquad) {}

  subscribedTo(): DomainEventClass[] {
    return [TownSoldiersTrainFinished];
  }

  async on(domainEvent: TownSoldiersTrainFinished) {
    const townId = TownId.create(domainEvent.aggregateId);
    const squads = Squads.create(domainEvent.attributes.soldiers);
    if (squads.isFailure()) return logger.error(squads.value.stack);
    const result = await this.recruitSquad.execute({ townId, squads: squads.value });
    if (result.isFailure()) return logger.error(result.value.stack);
  }
}
