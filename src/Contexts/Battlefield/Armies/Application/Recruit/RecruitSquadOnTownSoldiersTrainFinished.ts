import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { RecruitSquad } from './RecruitSquad';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';
import { TownSoldiersTrainFinished } from '../../../../CryptoWars/Towns/domain/TownSoldierTrainFinishedDomainEvent';
import { Squads } from '../../Domain/Squads';

export class RecruitSquadOnTownSoldiersTrainFinished
  implements DomainEventSubscriber<TownSoldiersTrainFinished>
{
  constructor(private recruitSoldiers: RecruitSquad) {}

  subscribedTo(): DomainEventClass[] {
    return [TownSoldiersTrainFinished];
  }

  async on(domainEvent: TownSoldiersTrainFinished) {
    const townId = TownId.create(domainEvent.aggregateId);
    const squad = Squads.fromTownSoldiers(domainEvent.soldiers);
    const result = await this.recruitSoldiers.execute({ townId, squad });
    if (result.isFailure()) throw Error(result.value.message);
  }
}
