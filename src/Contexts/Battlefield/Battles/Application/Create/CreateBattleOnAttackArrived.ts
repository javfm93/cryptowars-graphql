import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventHandler } from '../../../../Shared/Domain/DomainEventHandler';
import { CreateBattle } from './CreateBattle';
import { AttackArrivedDomainEvent } from '../../../Attacks/Domain/AttackArrivedDomainEvent';
import { AttackId } from '../../../Attacks/Domain/AttackId';
import { BattleId } from '../../Domain/BattleId';

export class CreateBattleOnAttackArrived implements DomainEventHandler<AttackArrivedDomainEvent> {
  constructor(private createBattle: CreateBattle) {}

  subscribedTo(): DomainEventClass[] {
    return [AttackArrivedDomainEvent];
  }

  async on(domainEvent: AttackArrivedDomainEvent) {
    const id = BattleId.random();
    const attackId = AttackId.create(domainEvent.aggregateId);
    await this.createBattle.execute({ id, attackId });
  }
}
