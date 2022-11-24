import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { RecruitSquad } from './RecruitSquad';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { TownSoldiersTrainFinished } from '../../../../CryptoWars/Towns/Domain/TownSoldiersTrainFinishedDomainEvent';
import { Squads } from '../../Domain/Squads';

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
    if (squads.isFailure()) throw Error(squads.value.message);
    const result = await this.recruitSquad.execute({ townId, squads: squads.value });
    if (result.isFailure()) throw Error(result.value.message);
  }
}
