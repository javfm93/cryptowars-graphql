import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { UserCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserCreatedDomainEvent';
import { UserIdGenerator } from '../../Users/domain/UserIdGenerator';

export class PlayerGenerator {
  static create(id: PlayerId): Player {
    return Player.create(id);
  }

  static fromEvent(event: UserCreatedDomainEvent): Player {
    return this.create(UserIdGenerator.create(event.aggregateId));
  }

  static random(): Player {
    return this.create(UserIdGenerator.random());
  }
}
