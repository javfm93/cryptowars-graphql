import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { PlayerCreatedDomainEvent } from './PlayerCreatedDomainEvent';
import { UserId } from '../../Users/Domain/UserId';
import { PlayerId } from './PlayerId';
import { World, WorldPrimitives } from '../../Worlds/Domain/World';
import { Worlds } from '../../Worlds/Domain/Worlds';
import { PlayerWorldSelectedDomainEvent } from './PlayerWorldSelectedDomainEvent';
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

  public addWorld(world: World): void {
    this.props.worlds.add(world);
    const eventBody = { id: this.id.toString(), worldId: world.id.toString() };
    this.record(new PlayerWorldSelectedDomainEvent(eventBody));
  }

  public addTown(town: Town): void {
    this.props.towns.add(town);
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
