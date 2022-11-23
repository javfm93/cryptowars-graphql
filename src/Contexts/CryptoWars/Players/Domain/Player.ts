import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { UserId } from '../../../IAM/Users/Domain/UserId';
import { PlayerId } from './PlayerId';
import { WorldPrimitives } from '../../Worlds/Domain/World';
import { Worlds } from '../../Worlds/Domain/Worlds';
import { Town, TownPrimitives } from '../../Towns/Domain/Town';
import { Towns } from '../../Towns/Domain/Towns';

export interface PlayerProps {
  userId: UserId;
  worlds: Worlds;
  towns: Towns;
}

export interface PlayerCreationProps {
  userId: UserId;
  worlds?: Worlds;
  towns?: Towns;
}

export interface PlayerPrimitives {
  id: string;
  userId: string;
  worlds: Array<WorldPrimitives>;
  towns: Array<TownPrimitives>;
}

export interface PlayerCorePrimitives {
  id: string;
  userId: string;
}

export class Player extends AggregateRoot<PlayerProps> {
  private constructor(id: PlayerId, props: PlayerCreationProps) {
    super(id, {
      ...props,
      worlds: props.worlds ?? Worlds.create(),
      towns: props.towns ?? Towns.create()
    });
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get worlds(): Worlds {
    return this.props.worlds;
  }

  get towns(): Towns {
    return this.props.towns;
  }

  public isOwnerOf(town: Town): boolean {
    return this.props.towns.exists(town);
  }

  public static create(id: PlayerId, props: PlayerCreationProps): Player {
    const user = new Player(id, props);
    user.record(
      new PlayerCreatedDomainEvent({
        aggregateId: user.id.toString()
      })
    );
    return user;
  }

  toPrimitives(): PlayerPrimitives {
    return {
      id: this.id.toString(),
      userId: this.props.userId.toString(),
      worlds: this.props.worlds.toPrimitives(),
      towns: this.props.towns.toPrimitives()
    };
  }

  toCorePrimitives(): PlayerCorePrimitives {
    return {
      id: this.id.toString(),
      userId: this.props.userId.toString()
    };
  }

  static fromPrimitives(plainData: PlayerPrimitives): Player {
    const id = PlayerId.create(plainData.id);
    const userId = UserId.create(plainData.userId);
    const worlds = plainData.worlds ? Worlds.fromPrimitives(plainData.worlds) : Worlds.create();
    const towns = plainData.towns ? Towns.fromPrimitives(plainData.towns) : Towns.create();
    return new Player(id, { userId, worlds, towns });
  }

  static fromCorePrimitives(plainData: PlayerCorePrimitives): Player {
    const id = PlayerId.create(plainData.id);
    const userId = UserId.create(plainData.userId);
    return new Player(id, { userId });
  }
}
