import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { UserId } from '../../Users/Domain/UserId';
import { PlayerId } from './PlayerId';
import { World, WorldPrimitives } from '../../Worlds/Domain/World';
import { Worlds } from '../../Worlds/Domain/Worlds';

export interface PlayerProps {
  userId: UserId;
  worlds: Worlds;
}

export interface PlayerCreationProps {
  userId: UserId;
  worlds?: Worlds;
}

export interface PlayerPrimitives {
  id: string;
  userId: string;
  worlds: Array<WorldPrimitives>;
}

export class Player extends AggregateRoot<PlayerProps> {
  private constructor(id: PlayerId, props: PlayerCreationProps) {
    super(id, { ...props, worlds: props.worlds ?? Worlds.create() });
  }

  public addWorld(world: World): void {
    this.props.worlds.add(world);
  }

  get userId(): UserId {
    return this.props.userId;
  }

  get worlds(): Worlds {
    return this.props.worlds;
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
      worlds: this.props.worlds.toPrimitives()
    };
  }

  static fromPrimitives(plainData: PlayerPrimitives): Player {
    const id = PlayerId.create(plainData.id);
    const userId = UserId.create(plainData.userId);
    const worlds = Worlds.fromPrimitives(plainData.worlds);
    return new Player(id, { userId, worlds });
  }
}
