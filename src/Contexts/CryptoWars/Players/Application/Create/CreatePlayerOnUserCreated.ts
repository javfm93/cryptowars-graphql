import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import {
  DomainEventHandler,
  RegisterDomainEventHandler
} from '../../../../Shared/Domain/DomainEventHandler';
import { UserCreatedDomainEvent } from '../../../../IAM/Users/Domain/UserCreatedDomainEvent';
import { CreatePlayer } from './CreatePlayer';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { PlayerId } from '../../Domain/PlayerId';

@RegisterDomainEventHandler()
export class CreatePlayerOnUserCreated implements DomainEventHandler<UserCreatedDomainEvent> {
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
