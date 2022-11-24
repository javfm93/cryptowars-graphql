import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { WorldId } from './WorldId';
import { WorldName } from './WorldName';
import { Town, TownPrimitives } from '../../Towns/Domain/Town';
import { WorldPlayerJoinedDomainEvent } from './WorldPlayerJoinedDomainEvent';
import { Player, PlayerCorePrimitives } from '../../Players/Domain/Player';
import { Towns } from '../../Towns/Domain/Towns';
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
  players: Array<PlayerCorePrimitives>;
  towns: Array<TownPrimitives>;
}

export type WorldTownPrimitives = Omit<TownPrimitives, 'buildings' | 'worldId'>;
export type WorldTownsPrimitives = Array<WorldTownPrimitives>;

export interface WorldMapProjection {
  id: string;
  name: string;
  towns: WorldTownsPrimitives;
}

export class World extends AggregateRoot<WorldProps> {
  protected constructor(id: WorldId, props: WorldCreationProps) {
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
    this.record(
      new WorldPlayerJoinedDomainEvent({
        aggregateId: this.id.toString(),
        attributes: {
          playerId: player.id.toString()
        }
      })
    );
  }

  public addTown(town: Town): void {
    this.props.towns.add(town);
  }

  toPrimitives(): WorldPrimitives {
    return {
      id: this.id.toString(),
      name: this.props.name.toString(),
      players: this.props.players.toCorePrimitives(),
      towns: this.props.towns.toPrimitives()
    };
  }

  toMap(): WorldMapProjection {
    const towns = this.props.towns.toPrimitives();
    return {
      id: this.id.toString(),
      name: this.props.name.toString(),
      towns: towns.map(town => ({ id: town.id, playerId: town.playerId }))
    };
  }

  static fromPrimitives(plainData: WorldPrimitives): World {
    const name = new WorldName(plainData.name);
    const players = plainData.players
      ? Players.fromCorePrimitives(plainData.players)
      : Players.create();
    const towns = plainData.towns ? Towns.fromPrimitives(plainData.towns) : Towns.create();
    return new World(WorldId.create(plainData.id), { name, players, towns });
  }
}
