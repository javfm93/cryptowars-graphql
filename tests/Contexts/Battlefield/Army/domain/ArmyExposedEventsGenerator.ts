import { ArmyId } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { ArmyCreatedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/ArmyCreatedDomainEvent';
import { SoldiersRecruitedDomainEvent } from '../../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersRecruitedDomainEvent';
import { SquadPrimitives } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Squads';
import { Uuid } from '../../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { Army } from '../../../../../src/Contexts/Battlefield/Armies/Domain/Army';

export class ArmyExposedEventsGenerator {
  static ArmyCreated(army: Army): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({
      id: army.id.toString(),
      townId: army.townId.toString(),
      playerId: army.PlayerId.toString()
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
}
