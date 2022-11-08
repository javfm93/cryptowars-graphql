import { ArmyCreatedDomainEvent } from './ArmyCreatedDomainEvent';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { SquadPrimitives, Squads, SquadsPrimitives } from './Squads';
import { AggregateRoot } from '../../Shared/Domain/AggregateRoot';

export interface ArmyProps {
  townId: TownId;
  playerId: PlayerId;
  squads: Squads;
}

export interface ArmyCreationProps {
  townId: TownId;
  playerId: PlayerId;
  squads?: Squads;
}

export interface ArmyPrimitives {
  id: string;
  townId: string;
  playerId: string;
  squads: SquadsPrimitives;
}

export class Army extends AggregateRoot<ArmyProps> {
  private constructor(id: ArmyId, props: ArmyCreationProps) {
    super(id, {
      ...props,
      squads: props.squads ?? Squads.defaultSquads()
    });
  }

  get PlayerId(): PlayerId {
    return this.props.playerId;
  }

  get townId(): TownId {
    return this.props.townId;
  }

  get basicSquad(): SquadPrimitives {
    return this.props.squads.basic;
  }

  public isCommandedBy(playerId: PlayerId) {
    return this.props.playerId.isEqualTo(playerId);
  }

  public recruit(newSquad: SquadPrimitives) {
    this.props.squads.absorb(newSquad);
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
      playerId: this.props.playerId.toString(),
      squads: this.props.squads.value
    };
  }

  static fromPrimitives(plainData: ArmyPrimitives): Army {
    const id = ArmyId.create(plainData.id);
    const townId = TownId.create(plainData.townId);
    const playerId = PlayerId.create(plainData.playerId);
    const squads = Squads.fromPrimitives(plainData.squads);
    return new Army(id, { townId, playerId, squads });
  }
}
