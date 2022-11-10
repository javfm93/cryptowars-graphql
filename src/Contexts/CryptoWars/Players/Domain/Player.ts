import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { UserId } from '../../../IAM/Users/Domain/UserId';
import { PlayerId } from './PlayerId';
import { WorldPrimitives } from '../../Worlds/Domain/World';
import { Worlds } from '../../Worlds/Domain/Worlds';
import { Town, TownPrimitives } from '../../Towns/domain/Town';
import { Towns } from '../../Towns/domain/Towns';

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
        id: user.id.toString()
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

  static fromPrimitives(plainData: PlayerPrimitives): Player {
    const id = PlayerId.create(plainData.id);
    const userId = UserId.create(plainData.userId);
    const worlds = Worlds.fromPrimitives(plainData.worlds);
    const towns = Towns.fromPrimitives(plainData.towns);
    return new Player(id, { userId, worlds, towns });
  }
}
