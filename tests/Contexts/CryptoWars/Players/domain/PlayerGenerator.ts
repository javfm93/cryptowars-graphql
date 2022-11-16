import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { Player } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { UserIdGenerator } from '../../../IAM/Users/domain/UserIdGenerator';
import { UserId } from '../../../../../src/Contexts/IAM/Users/Domain/UserId';
import { PlayerIdGenerator } from './PlayerIdGenerator';
import { UserCreatedDomainEvent } from '../../../../../src/Contexts/IAM/Users/Domain/UserCreatedDomainEvent';
import { Worlds } from '../../../../../src/Contexts/CryptoWars/Worlds/Domain/Worlds';
import { Towns } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Towns';
import { Players } from '../../../../../src/Contexts/CryptoWars/Players/Domain/Players';
import { WorldGenerator } from '../../Worlds/Domain/WorldGenerator';
import { TownGenerator } from '../../Towns/domain/TownGenerator';
import { Town } from '../../../../../src/Contexts/CryptoWars/Towns/domain/Town';

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
    return this.create(PlayerIdGenerator.random(), UserIdGenerator.random());
  }

  static withWorldsAndTowns(): Player {
    const playerId = PlayerIdGenerator.random();
    const worlds = Worlds.create([WorldGenerator.empty()]);
    const towns = TownGenerator.multipleRandomFor(playerId, worlds.getItems()[0].id);
    return this.create(playerId, UserIdGenerator.random(), worlds, towns);
  }

  static multipleRandom(): Players {
    const players = Array.from({ length: 2 }, () => this.random());
    return Players.create(players);
  }

  static fromUser(userId: UserId): Player {
    return this.create(PlayerIdGenerator.random(), userId);
  }

  static fromUserWithTown(userId: UserId, town: Town): Player {
    const worlds = WorldGenerator.multipleRandom();
    const towns = Towns.create([town]);
    return this.create(PlayerIdGenerator.random(), userId, worlds, towns);
  }
}
