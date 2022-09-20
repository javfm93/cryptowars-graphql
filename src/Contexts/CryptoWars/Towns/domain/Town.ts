import { TownCreatedDomainEvent } from './TownCreatedDomainEvent';
import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { TownId } from './TownId';
import { PlayerId } from '../../Players/Domain/PlayerId';
import { TownBuildings, TownBuildingsPrimitives } from './TownBuildings';

export interface TownProps {
  playerId: PlayerId;
  buildings: TownBuildings;
}

export interface TownCreationProps {
  playerId: PlayerId;
}

export interface TownPrimitives {
  id: string;
  playerId: string;
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
      buildings: this.props.buildings.value
    };
  }

  static fromPrimitives(plainData: TownPrimitives): Town {
    return new Town(TownId.create(plainData.id), {
      playerId: PlayerId.create(plainData.playerId),
      buildings: TownBuildings.fromPrimitives(plainData.buildings)
    });
  }
}
