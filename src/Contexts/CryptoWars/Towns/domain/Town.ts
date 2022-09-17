import { TownCreatedDomainEvent } from './TownCreatedDomainEvent';
import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { TownId } from './TownId';
import { PlayerId } from '../../Players/Domain/PlayerId';

export interface TownProps {
  playerId: PlayerId;
}

export interface TownCreationProps {
  playerId: PlayerId;
}

export interface TownPrimitives {
  id: string;
  playerId: string;
}

export class Town extends AggregateRoot<TownProps> {
  private constructor(id: TownId, props: TownCreationProps) {
    super(id, props);
  }

  public static create(id: TownId, props: TownCreationProps): Town {
    const town = new Town(id, props);
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
      playerId: this.props.playerId.toString()
    };
  }

  static fromPrimitives(plainData: TownPrimitives): Town {
    return new Town(TownId.create(plainData.id), {
      playerId: PlayerId.create(plainData.playerId)
    });
  }
}
