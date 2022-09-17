import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { UserIdGenerator } from '../../Users/domain/UserIdGenerator';
import { UserId } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserId';
import { PlayerIdGenerator } from './PlayerIdGenerator';
import { UserCreatedDomainEvent } from '../../../../../src/Contexts/CryptoWars/Users/Domain/UserCreatedDomainEvent';
import { User } from '../../../../../src/Contexts/CryptoWars/Users/Domain/User';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';
import { WorldGenerator } from '../../Worlds/Domain/WorldGenerator';
import { TownGenerator } from '../../Towns/domain/TownGenerator';
import { Towns } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Towns';

export class PlayerGenerator {
  static create(id: PlayerId, userId: UserId, worlds?: Worlds, towns?: Towns): Player {
    return Player.fromPrimitives({
      id: id.toString(),
      userId: userId.toString(),
      worlds: worlds?.toPrimitives() ?? [],
      towns: towns?.toPrimitives() ?? []
    });
  }

  static fromEvent(event: UserCreatedDomainEvent, id: PlayerId): Player {
    return this.create(id, UserId.create(event.aggregateId));
  }

  static random(): Player {
    const playerId = PlayerIdGenerator.random();
    return this.create(
      playerId,
      UserIdGenerator.random(),
      WorldGenerator.multipleRandom(),
      TownGenerator.multipleRandomFor(playerId)
    );
  }

  static withoutTowns(): Player {
    return this.create(
      PlayerIdGenerator.random(),
      UserIdGenerator.random(),
      WorldGenerator.multipleRandom()
    );
  }

  static fromUser(user: User): Player {
    return this.create(PlayerIdGenerator.random(), user.id);
  }
}
