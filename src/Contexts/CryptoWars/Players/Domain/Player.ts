import { UserId } from '../../../IAM/Users/Domain/UserId';
import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Town } from '../../Towns/Domain/Town';
import { Towns } from '../../Towns/Domain/Towns';
import { Worlds } from '../../Worlds/Domain/Worlds';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { PlayerId } from './PlayerId';
import { PlayerName } from './PlayerName';

export type PlayerCorePrimitives = Omit<Primitives<Player>, 'worlds' | 'towns'>;

export class Player extends AggregateRoot {
  private constructor(
    id: PlayerId,
    readonly userId: UserId,
    readonly name: PlayerName,
    readonly worlds = Worlds.create(),
    readonly towns = Towns.create()
  ) {
    super(id);
  }

  public isOwnerOf(town: Town): boolean {
    return this.towns.exists(town);
  }

  public static create(id: PlayerId, userId: UserId, name: PlayerName): Player {
    const player = new Player(id, userId, name);
    player.record(
      new PlayerCreatedDomainEvent({
        aggregateId: player.id.toString()
      })
    );
    return player;
  }

  toPrimitives(): Primitives<Player> {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      name: this.name.toString(),
      worlds: this.worlds.toPrimitives(),
      towns: this.towns.toPrimitives()
    };
  }

  toCorePrimitives(): PlayerCorePrimitives {
    return {
      id: this.id.toString(),
      userId: this.userId.toString(),
      name: this.name.toString()
    };
  }

  static fromPrimitives(plainData: Primitives<Player>): Player {
    const id = PlayerId.create(plainData.id);
    const userId = UserId.create(plainData.userId);
    const name = PlayerName.fromPrimitives(plainData.name);
    const worlds = plainData.worlds ? Worlds.fromPrimitives(plainData.worlds) : Worlds.create();
    const towns = plainData.towns ? Towns.fromPrimitives(plainData.towns) : Towns.create();
    return new Player(id, userId, name, worlds, towns);
  }

  static fromCorePrimitives(plainData: PlayerCorePrimitives): Player {
    const id = PlayerId.create(plainData.id);
    const userId = UserId.create(plainData.userId);
    const name = PlayerName.fromPrimitives(plainData.name);
    return new Player(id, userId, name);
  }
}
