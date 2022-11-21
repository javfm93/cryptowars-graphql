import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/Domain/DomainEventSubscriber';
import { ReceiveSoldiersFromBattle } from './ReceiveSoldiersFromBattle';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { Squads } from '../../Domain/Squads';
import { BattleTroopReturnedDomainEvent } from '../../../Battles/Domain/BattleTroopReturnedDomainEvent';

export class ReceiveSoldiersFromBattleOnBattleTroopReturned
  implements DomainEventSubscriber<BattleTroopReturnedDomainEvent>
{
  constructor(private receiveSoldiersFromBattle: ReceiveSoldiersFromBattle) {}

  subscribedTo(): DomainEventClass[] {
    return [BattleTroopReturnedDomainEvent];
  }

  async on(domainEvent: BattleTroopReturnedDomainEvent) {
    const townId = TownId.create(domainEvent.troop.armyId);
    const squad = Squads.fromPrimitives(domainEvent.troop.squads);
    const result = await this.receiveSoldiersFromBattle.execute({ townId, squad });
    if (result.isFailure()) throw Error(result.value.message);
  }
}
