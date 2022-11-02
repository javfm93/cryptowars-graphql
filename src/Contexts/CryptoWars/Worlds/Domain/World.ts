import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { WorldId } from './WorldId';
import { WorldName } from './WorldName';
import { Town, TownPrimitives } from '../../Towns/domain/Town';
import { WorldPlayerJoinedDomainEvent } from './WorldPlayerJoinedDomainEvent';
import { Player, PlayerPrimitives } from '../../Players/Domain/Player';
import { Towns } from '../../Towns/domain/Towns';
import { Players } from '../../Players/Domain/Players';

export interface WorldCreationProps {
  name: WorldName;
  players?: Players;
  towns?: Towns;
}

export interface WorldProps {
  name: WorldName;
  players: Players;
  towns: Towns;
}

export interface WorldPrimitives {
  id: string;
  name: string;
  players: Array<PlayerPrimitives>;
  towns: Array<TownPrimitives>;
}

export class World extends AggregateRoot<WorldProps> {
  private constructor(id: WorldId, props: WorldCreationProps) {
    super(id, {
      ...props,
      players: props.players ?? Players.create(),
      towns: props.towns ?? Towns.create()
    });
  }

  public static create(id: WorldId, props: WorldCreationProps): World {
    return new World(id, props);
  }

  public addPlayer(player: Player): void {
    this.props.players.add(player);
    const eventBody = { id: this.id.toString(), playerId: player.id.toString() };
    this.record(new WorldPlayerJoinedDomainEvent(eventBody));
  }

  public addTown(town: Town): void {
    this.props.towns.add(town);
  }

  toPrimitives(): WorldPrimitives {
    return {
      id: this.id.toString(),
      name: this.props.name.toString(),
      players: this.props.players.toPrimitives(),
      towns: this.props.towns.toPrimitives()
    };
  }

  static fromPrimitives(plainData: WorldPrimitives): World {
    const name = new WorldName(plainData.name);
    const players = plainData.players
      ? Players.fromPrimitives(plainData.players)
      : Players.create();
    const towns = plainData.towns ? Towns.fromPrimitives(plainData.towns) : Towns.create();
    return new World(WorldId.create(plainData.id), { name, players, towns });
  }
}
