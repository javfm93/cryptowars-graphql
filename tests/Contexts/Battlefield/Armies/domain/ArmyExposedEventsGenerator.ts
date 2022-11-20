import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { ArmyCreatedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyCreatedDomainEvent';
import { SoldiersRecruitedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersRecruitedDomainEvent';
import {
  SquadPrimitives,
  Squads
} from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';
import { Uuid } from '../../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { SoldiersReceivedFromBattleDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersReceivedFromBattleDomainEvent';
import { ArmyAttackedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyAttackedDomainEvent';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { SoldiersSentToAttackDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersSentToAttackDomainEvent';
import { SendAttackCommand } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';

export class ArmyExposedEventsGenerator {
  static ArmyCreated(army: Army): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({
      id: army.id.toString(),
      townId: army.townId.toString(),
      playerId: army.playerId.toString()
    });
  }

  static SoldiersRecruited(
    armyId: ArmyId,
    townId: Uuid,
    squad: SquadPrimitives
  ): SoldiersRecruitedDomainEvent {
    return new SoldiersRecruitedDomainEvent({
      id: armyId.toString(),
      townId: townId.toString(),
      squad
    });
  }

  static SoldiersSentToAttack(attack: SendAttackCommand): SoldiersSentToAttackDomainEvent {
    return new SoldiersSentToAttackDomainEvent({
      aggregateId: attack.attackerArmy.toString(),
      squads: Squads.fromTownSoldiers(attack.soldiers).value
    });
  }

  static SoldiersFromBattleReceived(battle: Battle): SoldiersReceivedFromBattleDomainEvent {
    return new SoldiersReceivedFromBattleDomainEvent({
      aggregateId: battle.result.returningTroop.armyId,
      squads: battle.result.returningTroop.squads
    });
  }

  static ArmyAttackedIn(battle: Battle): ArmyAttackedDomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId: battle.defenderArmy.id.toString(),
      squads: Squads.fromTownSoldiers(battle.result.defenderCasualties).value
    });
  }
}
