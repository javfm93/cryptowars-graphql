import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { ArmyCreatedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyCreatedDomainEvent';
import { SoldiersRecruitedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersRecruitedDomainEvent';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';
import { SoldiersReceivedFromBattleDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersReceivedFromBattleDomainEvent';
import { ArmyAttackedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyAttackedDomainEvent';
import { Battle } from '../../../../../src/Contexts/Battlefield/Battles/Domain/Battle';
import { SoldiersSentToAttackDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersSentToAttackDomainEvent';
import { SendAttackCommand } from '../../../../../src/Contexts/Battlefield/Attacks/Application/Send/SendAttackCommand';
import { Squads } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';

export class ArmyExposedEventsGenerator {
  static ArmyCreated(army: Army): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({
      aggregateId: army.id.toString(),
      townId: army.townId.toString(),
      playerId: army.playerId.toString()
    });
  }

  static SoldiersRecruited(armyId: ArmyId, squad: Squads): SoldiersRecruitedDomainEvent {
    return new SoldiersRecruitedDomainEvent({
      aggregateId: armyId.toString(),
      squad: squad.value
    });
  }

  static SoldiersSentToAttackFrom(attack: SendAttackCommand): SoldiersSentToAttackDomainEvent {
    return new SoldiersSentToAttackDomainEvent({
      aggregateId: attack.attackerArmy.toString(),
      squads: attack.soldiers
    });
  }

  static SoldiersSentToAttack(armyId: ArmyId, squads: Squads): SoldiersSentToAttackDomainEvent {
    return new SoldiersSentToAttackDomainEvent({
      aggregateId: armyId.toString(),
      squads: squads.value
    });
  }

  static SoldiersFromBattleReceived(battle: Battle): SoldiersReceivedFromBattleDomainEvent {
    return new SoldiersReceivedFromBattleDomainEvent({
      aggregateId: battle.result.returningTroop.armyId.toString(),
      squads: battle.result.returningTroop.squads.value
    });
  }

  static ArmyAttackedIn(battle: Battle): ArmyAttackedDomainEvent {
    return new ArmyAttackedDomainEvent({
      aggregateId: battle.defenderArmy.id.toString(),
      casualties: battle.result.defenderCasualties.value
    });
  }
}
