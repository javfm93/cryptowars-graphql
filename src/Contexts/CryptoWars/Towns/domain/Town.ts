import { TownCreatedDomainEvent } from './TownCreatedDomainEvent';
import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { TownId } from './TownId';
import { PlayerId } from '../../Players/Domain/PlayerId';
import { TownBuildings, TownBuildingsPrimitives } from './TownBuildings';
import { WorldId } from '../../Worlds/Domain/WorldId';

export interface TownProps {
  playerId: PlayerId;
  worldId: WorldId;
  buildings: TownBuildings;
}

export interface TownCreationProps {
  playerId: PlayerId;
  worldId: WorldId;
}

export interface TownPrimitives {
  id: string;
  playerId: string;
  worldId: string;
  buildings: TownBuildingsPrimitives;
}

export class Town extends AggregateRoot<TownProps> {
  private constructor(id: TownId, props: TownProps) {
    super(id, props);
  }

  public static create(id: TownId, props: TownCreationProps): Town {
    const townBuildings = TownBuildings.createInitialBuildings();
    const town = new Town(id, { ...props, buildings: townBuildings });
    town.record(
      new TownCreatedDomainEvent({
        id: town.id.toString(),
        playerId: props.playerId.toString()
      })
    );
    return town;
  }

  toPrimitives(): TownPrimitives {
    return {
      id: this.id.toString(),
      playerId: this.props.playerId.toString(),
      worldId: this.props.worldId.toString(),
      buildings: this.props.buildings.value
    };
  }

  static fromPrimitives(plainData: TownPrimitives): Town {
    return new Town(TownId.create(plainData.id), {
      playerId: PlayerId.create(plainData.playerId),
      worldId: WorldId.create(plainData.worldId),
      buildings: TownBuildings.fromPrimitives(plainData.buildings)
    });
  }
}
