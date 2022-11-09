import { ArmyCreatedDomainEvent } from './ArmyCreatedDomainEvent';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/domain/TownId';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { SquadPrimitives, Squads, SquadsPrimitives } from './Squads';
import { AggregateRoot } from '../../Shared/Domain/AggregateRoot';
import { SoldiersRecruitedDomainEvent } from './SoldiersRecruitedDomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

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
    this.record(
      new SoldiersRecruitedDomainEvent({
        id: this.id.toString(),
        townId: this.townId.toString(),
        squad: newSquad
      })
    );
  }

  public static create(id: ArmyId, props: ArmyCreationProps): Army {
    const army = new Army(id, props);
    army.record(
      new ArmyCreatedDomainEvent({
        id: army.id.toString(),
        townId: army.townId.toString(),
        playerId: army.PlayerId.toString()
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

  static materializeFrom(events: Array<BattlefieldInternalEvent>): Army {
    let army = Army.create(Uuid.random(), { townId: Uuid.random(), playerId: Uuid.random() });
    for (const event of events) {
      if (ArmyCreatedDomainEvent.isMe(event)) {
        const exposedEvent = ArmyCreatedDomainEvent.fromBattlefieldInternalEvent(event);
        army = Army.create(ArmyId.create(exposedEvent.aggregateId), {
          townId: TownId.create(exposedEvent.townId),
          playerId: PlayerId.create(exposedEvent.playerId)
        });
      } else if (SoldiersRecruitedDomainEvent.isMe(event)) {
        const exposedEvent = SoldiersRecruitedDomainEvent.fromBattlefieldInternalEvent(event);
        army.recruit(exposedEvent.squad);
      } else {
        throw Error(`Unknown event for army materialization: ${event.id}: ${event.name}`);
      }
    }
    army.pullDomainEvents();
    return army;
  }
}
