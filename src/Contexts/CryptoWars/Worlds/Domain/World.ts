import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { Player } from '../../Players/Domain/Player';
import { Players } from '../../Players/Domain/Players';
import { Town } from '../../Towns/Domain/Town';
import { Towns } from '../../Towns/Domain/Towns';
import { WorldId } from './WorldId';
import { WorldName } from './WorldName';
import { WorldPlayerJoinedDomainEvent } from './WorldPlayerJoinedDomainEvent';

export type WorldTownProjection = Omit<Primitives<Town>, 'buildings' | 'worldId'>;
export type WorldTownsProjection = Array<WorldTownProjection>;

export interface WorldMapProjection {
  id: string;
  name: string;
  towns: WorldTownsProjection;
}

export class World extends AggregateRoot {
  private constructor(
    id: WorldId,
    readonly name: WorldName,
    readonly players = Players.create(),
    readonly towns = Towns.create()
  ) {
    super(id);
  }

  public addPlayer(player: Player): void {
    this.players.add(player);
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
    this.towns.add(town);
  }

  toPrimitives(): Primitives<World> {
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      players: this.players.toCorePrimitives() as Primitives<Players>,
      towns: this.towns.toPrimitives()
    };
  }

  toMap(): WorldMapProjection {
    const towns = this.towns.toPrimitives();
    return {
      id: this.id.toString(),
      name: this.name.toString(),
      towns: towns.map(town => ({ id: town.id, playerId: town.playerId }))
    };
  }

  static fromPrimitives(plainData: Primitives<World>): World {
    const name = new WorldName(plainData.name);
    const players = plainData.players
      ? Players.fromCorePrimitives(plainData.players)
      : Players.create();
    const towns = plainData.towns ? Towns.fromPrimitives(plainData.towns) : Towns.create();
    return new World(WorldId.create(plainData.id), name, players, towns);
  }
}
