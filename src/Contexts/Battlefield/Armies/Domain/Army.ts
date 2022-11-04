import { AggregateRoot } from '../../../Shared/Domain/AggregateRoot';
import { ArmyCreatedDomainEvent } from './ArmyCreatedDomainEvent';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/domain/TownId';

export interface ArmyProps {
  townId: TownId;
}

export interface ArmyCreationProps {
  townId: TownId;
}

export interface ArmyPrimitives {
  id: string;
  townId: string;
}

export class Army extends AggregateRoot<ArmyProps> {
  private constructor(id: ArmyId, props: ArmyCreationProps) {
    super(id, {
      ...props
    });
  }

  get townId(): TownId {
    return this.props.townId;
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
      townId: this.props.townId.toString()
    };
  }

  static fromPrimitives(plainData: ArmyPrimitives): Army {
    const id = ArmyId.create(plainData.id);
    const townId = TownId.create(plainData.townId);
    return new Army(id, { townId });
  }
}
