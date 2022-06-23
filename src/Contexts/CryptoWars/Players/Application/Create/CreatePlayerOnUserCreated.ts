import { DomainEventClass } from '../../../../Shared/domain/DomainEvent';
import { DomainEventSubscriber } from '../../../../Shared/domain/DomainEventSubscriber';
import { UserCreatedDomainEvent } from '../../../Users/domain/UserCreatedDomainEvent';
import { CreatePlayer } from './CreatePlayer';
import { UserId } from '../../../Users/Domain/UserId';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { PlayerId } from '../../Domain/PlayerId';

export class CreatePlayerOnUserCreated implements DomainEventSubscriber<UserCreatedDomainEvent> {
  constructor(private createPlayer: CreatePlayer) {}

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent) {
    const userId = UserId.create(domainEvent.aggregateId);
    const id = PlayerId.create(Uuid.random().toString());
    await this.createPlayer.execute({ id, userId });
  }
}
