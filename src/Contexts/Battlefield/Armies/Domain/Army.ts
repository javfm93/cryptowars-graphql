import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { ArmyCreatedDomainEvent } from './ArmyCreatedDomainEvent';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';

export interface ArmyProps {
  townId: TownId;
  playerId: PlayerId;
}

export interface ArmyCreationProps {
  townId: TownId;
  playerId: PlayerId;
}

export interface ArmyPrimitives {
  id: string;
  townId: string;
  playerId: string;
}

export class Army extends AggregateRoot<ArmyProps> {
  private constructor(id: ArmyId, props: ArmyCreationProps) {
    super(id, {
      ...props
    });
  }

  get PlayerId(): PlayerId {
    return this.props.playerId;
  }

  get townId(): TownId {
    return this.props.townId;
  }

  public isCommandedBy(playerId: PlayerId) {
    return this.props.playerId.isEqualTo(playerId);
  }

  public static create(id: ArmyId, props: ArmyCreationProps): Army {
    const army = new Army(id, props);
    army.record(
      new ArmyCreatedDomainEvent({
        id: army.id.toString()
      })
    );
    return army;
  }

  toPrimitives(): ArmyPrimitives {
    return {
      id: this.id.toString(),
      townId: this.props.townId.toString(),
      playerId: this.props.playerId.toString()
    };
  }

  static fromPrimitives(plainData: ArmyPrimitives): Army {
    const id = ArmyId.create(plainData.id);
    const townId = TownId.create(plainData.townId);
    const playerId = PlayerId.create(plainData.playerId);
    return new Army(id, { townId, playerId });
  }
}
