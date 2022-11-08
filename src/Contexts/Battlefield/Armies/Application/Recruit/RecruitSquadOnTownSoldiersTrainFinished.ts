import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { RecruitSquad } from './RecruitSquad';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { ArmyId } from '../../Domain/ArmyId';
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
    const id = ArmyId.create(Uuid.random().toString());
    const squad = Squads.fromTownSoldiers(domainEvent.soldiers);
    await this.recruitSoldiers.execute({ id, townId, squad });
  }
}
