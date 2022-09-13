import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { PlayerWorldSelectedDomainEvent } from '../../../Players/Domain/PlayerWorldSelectedDomainEvent';
import { TownId } from '../../domain/TownId';
import { PlayerId } from '../../../Players/Domain/PlayerId';
import { CreateTown } from './CreateTown';

export class CreateTownOnPlayerWorldSelected
  implements DomainEventSubscriber<PlayerWorldSelectedDomainEvent>
{
  constructor(private createTown: CreateTown) {}

  subscribedTo(): DomainEventClass[] {
    return [PlayerWorldSelectedDomainEvent];
  }

  async on(domainEvent: PlayerWorldSelectedDomainEvent) {
    const playerId = PlayerId.create(domainEvent.aggregateId);
    const id = TownId.create(Uuid.random().toString());
    await this.createTown.execute({ id, playerId });
  }
}
