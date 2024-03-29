import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import {
  DomainEventHandler,
  RegisterDomainEventHandler
} from '../../../../Shared/Domain/DomainEventHandler';
import { ReceiveSoldiersFromBattle } from './ReceiveSoldiersFromBattle';
import { Squads } from '../../Domain/Squads';
import { BattleTroopReturnedDomainEvent } from '../../../Battles/Domain/BattleTroopReturnedDomainEvent';
import { logger } from '../../../../Shared/Infrastructure/WinstonLogger';
import { ArmyId } from '../../Domain/ArmyId';

@RegisterDomainEventHandler()
export class ReceiveSoldiersFromBattleOnBattleTroopReturned
  implements DomainEventHandler<BattleTroopReturnedDomainEvent>
{
  constructor(private receiveSoldiersFromBattle: ReceiveSoldiersFromBattle) {}

  subscribedTo(): DomainEventClass[] {
    return [BattleTroopReturnedDomainEvent];
  }

  async on(domainEvent: BattleTroopReturnedDomainEvent) {
    const armyId = ArmyId.create(domainEvent.attributes.troop.armyId);
    const squad = Squads.fromPrimitives(domainEvent.attributes.troop.squads);
    const result = await this.receiveSoldiersFromBattle.execute({ armyId, squad });
    if (result.isFailure()) logger.error(result.value.stack);
  }
}
