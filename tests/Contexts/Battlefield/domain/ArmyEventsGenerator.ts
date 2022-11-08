import { ArmyId } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { ArmyCreatedDomainEvent } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyCreatedDomainEvent';
import { SoldiersRecruitedDomainEvent } from '../../../../src/Contexts/Battlefield/Armies/Domain/SoldiersRecruitedDomainEvent';
import { SquadPrimitives } from '../../../../src/Contexts/Battlefield/Armies/Domain/Squads';
import { Uuid } from '../../../../src/Contexts/Shared/Domain/value-object/Uuid';

export class ArmyEventsGenerator {
  static ArmyCreated(armyId: ArmyId): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({ id: armyId.toString() });
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
