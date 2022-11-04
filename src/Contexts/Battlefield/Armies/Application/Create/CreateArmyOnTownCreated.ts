import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { CreateArmy } from './CreateArmy';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { ArmyId } from '../../Domain/ArmyId';
import { TownCreatedDomainEvent } from '../../../../CryptoWars/Towns/domain/TownCreatedDomainEvent';
import { TownId } from '../../../../CryptoWars/Towns/domain/TownId';

export class CreateArmyOnTownCreated implements DomainEventSubscriber<TownCreatedDomainEvent> {
  constructor(private createArmy: CreateArmy) {}

  subscribedTo(): DomainEventClass[] {
    return [TownCreatedDomainEvent];
  }

  async on(domainEvent: TownCreatedDomainEvent) {
    const townId = TownId.create(domainEvent.aggregateId);
    const id = ArmyId.create(Uuid.random().toString());
    await this.createArmy.execute({ id, townId });
  }
}
