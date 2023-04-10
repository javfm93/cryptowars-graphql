import { UserCreatedDomainEvent } from '../../../../IAM/Users/Domain/UserCreatedDomainEvent';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { DomainEventClass } from '../../../../Shared/Domain/DomainEvent';
import {
  DomainEventHandler,
  RegisterDomainEventHandler
} from '../../../../Shared/Domain/DomainEventHandler';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';
import { PlayerId } from '../../Domain/PlayerId';
import { PlayerName } from '../../Domain/PlayerName';
import { CreatePlayer } from './CreatePlayer';

@RegisterDomainEventHandler()
export class CreatePlayerOnUserCreated implements DomainEventHandler<UserCreatedDomainEvent> {
  constructor(private createPlayer: CreatePlayer) {}

  subscribedTo(): DomainEventClass[] {
    return [UserCreatedDomainEvent];
  }

  async on(domainEvent: UserCreatedDomainEvent) {
    const userId = UserId.create(domainEvent.aggregateId);
    const id = PlayerId.create(Uuid.random().toString());
    const name = PlayerName.create(domainEvent.attributes.name);
    // TODO: how to handle this failures if async?
    if (name.isFailure()) {
      throw name.value;
    }
    await this.createPlayer.execute({ id, userId, name: name.value });
  }
}
