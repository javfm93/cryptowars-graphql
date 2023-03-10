import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import { DomainEventHandler } from '../../../../Shared/Domain/DomainEventHandler';
import { CreateArmy } from './CreateArmy';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { ArmyId } from '../../Domain/ArmyId';
import { TownCreatedDomainEvent } from '../../../../CryptoWars/Towns/Domain/TownCreatedDomainEvent';
import { TownId } from '../../../../CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';

export class CreateArmyOnTownCreated implements DomainEventHandler<TownCreatedDomainEvent> {
  constructor(private createArmy: CreateArmy) {}

  subscribedTo(): DomainEventClass[] {
    return [TownCreatedDomainEvent];
  }

  async on(domainEvent: TownCreatedDomainEvent) {
    const townId = TownId.create(domainEvent.aggregateId);
    const playerId = PlayerId.create(domainEvent.attributes.playerId);
    const id = ArmyId.create(Uuid.random().toString());
    await this.createArmy.execute({ id, playerId, townId });
  }
}
