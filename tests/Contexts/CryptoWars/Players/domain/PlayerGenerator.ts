import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { UserIdGenerator } from '../../Users/domain/UserIdGenerator';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';
import { PlayerIdGenerator } from './PlayerIdGenerator';
import { UserCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserCreatedDomainEvent';
import { User } from '../../../../../src/Contexts/CryptoWars/Users/Domain/User';

export class PlayerGenerator {
  static create(id: PlayerId, userId: UserId): Player {
    return Player.create(id, { userId });
  }

  static fromEvent(event: UserCreatedDomainEvent, id: PlayerId): Player {
    return this.create(id, UserId.create(event.aggregateId));
  }

  static random(): Player {
    return this.create(PlayerIdGenerator.random(), UserIdGenerator.random());
  }

  static fromUser(user: User): Player {
    return this.create(PlayerIdGenerator.random(), user.id);
  }
}
