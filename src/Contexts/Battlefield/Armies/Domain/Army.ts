import { ArmyCreatedDomainEvent } from './ArmyCreatedDomainEvent';
import { ArmyId } from './ArmyId';
import { TownId } from '../../../CryptoWars/Towns/Domain/TownId';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { SquadPrimitives, Squads } from './Squads';
import { SoldiersRecruitedDomainEvent } from './SoldiersRecruitedDomainEvent';
import { BattlefieldInternalEvent } from '../../Shared/Domain/BattlefieldInternalEvent';
import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { AggregateRoot } from '../../Shared/Domain/FlatAggregateRoot';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { SoldiersSentToAttackDomainEvent } from './SoldiersSentToAttackDomainEvent';
import { ArmyAttackedDomainEvent } from './ArmyAttackedDomainEvent';
import { SoldiersReceivedFromBattleDomainEvent } from './SoldiersReceivedFromBattleDomainEvent';

interface ArmyCreationProps {
  id: ArmyId;
  townId: TownId;
  playerId: PlayerId;
  squads?: Squads;
}

export class Army extends AggregateRoot {
  readonly squads: Squads;

  private constructor(
    id: ArmyId,
    readonly townId: TownId,
    readonly playerId: PlayerId,
    squads?: Squads
  ) {
    super(id);
    this.squads = squads ?? Squads.defaultSquads();
  }

  getBasicSquad(): SquadPrimitives {
    return this.squads.basic;
  }

  public isCommandedBy(playerId: PlayerId): boolean {
    return this.playerId.isEqualTo(playerId);
  }

  public hasEnoughSoldiersToCreate(squads: Squads): boolean {
    return this.squads.thereAreEnoughSoldiersToCreate(squads);
  }

  public recruit(newSquad: Squads) {
    this.squads.absorb(newSquad);
    this.record(
      new SoldiersRecruitedDomainEvent({
        id: this.id.toString(),
        townId: this.townId.toString(),
        squad: newSquad.basic
      })
    );
  }

  public receiveSquadsFromBattle(squads: Squads) {
    this.record(
      new SoldiersReceivedFromBattleDomainEvent({
        aggregateId: this.id.toString(),
        squads: squads.value
      })
    );
    this.squads.absorb(squads);
  }

  public sendSquadsToAttack(squads: Squads) {
    this.record(
      new SoldiersSentToAttackDomainEvent({
        aggregateId: this.id.toString(),
        squads: squads.value
      })
    );
    this.squads.reduce(squads);
  }

  public applyBattleImpact(casualties: Squads) {
    this.record(
      new ArmyAttackedDomainEvent({
        aggregateId: this.id.toString(),
        squads: casualties.value
      })
    );
    this.squads.reduce(casualties);
  }

  public static create(props: ArmyCreationProps): Army {
    const army = new Army(props.id, props.townId, props.playerId, props.squads);
    army.record(
      new ArmyCreatedDomainEvent({
        id: army.id.toString(),
        townId: army.townId.toString(),
        playerId: army.playerId.toString()
      })
    );
    return army;
  }

  toPrimitives(): Primitives<Army> {
    return {
      id: this.id.toString(),
      townId: this.townId.toString(),
      playerId: this.playerId.toString(),
      squads: this.squads.value
    };
  }

  static fromPrimitives(plainData: Primitives<Army>): Army {
    const id = ArmyId.create(plainData.id);
    const townId = TownId.create(plainData.townId);
    const playerId = PlayerId.create(plainData.playerId);
    const squads = Squads.fromPrimitives(plainData.squads);
    return new Army(id, townId, playerId, squads);
  }

  static materializeFrom(events: Array<BattlefieldInternalEvent>): Army {
    let army = Army.create({ id: Uuid.random(), townId: Uuid.random(), playerId: Uuid.random() });
    for (const event of events) {
      if (ArmyCreatedDomainEvent.isMe(event)) {
        army = ArmyCreatedDomainEvent.fromBattlefieldInternalEvent(event).toArmy();
      } else if (SoldiersRecruitedDomainEvent.isMe(event)) {
        const exposedEvent = SoldiersRecruitedDomainEvent.fromBattlefieldInternalEvent(event);
        army.recruit(Squads.fromPrimitives([exposedEvent.squad]));
      } else if (SoldiersSentToAttackDomainEvent.isMe(event)) {
        const soldiersSent = SoldiersSentToAttackDomainEvent.fromBattlefieldInternalEvent(event);
        army.sendSquadsToAttack(Squads.fromPrimitives(soldiersSent.squads));
      } else if (SoldiersReceivedFromBattleDomainEvent.isMe(event)) {
        const soldiersReceived =
          SoldiersReceivedFromBattleDomainEvent.fromBattlefieldInternalEvent(event);
        army.receiveSquadsFromBattle(Squads.fromPrimitives(soldiersReceived.squads));
      } else if (ArmyAttackedDomainEvent.isMe(event)) {
        const armyAttacked = ArmyAttackedDomainEvent.fromBattlefieldInternalEvent(event);
        army.applyBattleImpact(Squads.fromPrimitives(armyAttacked.squads));
      } else {
        throw Error(`Unknown event for army materialization: ${event.id}: ${event.name}`);
      }
    }
    army.pullDomainEvents();
    return army;
  }
}
