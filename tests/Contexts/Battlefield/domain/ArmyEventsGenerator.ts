import { ArmyId } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';
import { ArmyCreatedDomainEvent } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyCreatedDomainEvent';

export class ArmyEventsGenerator {
  static ArmyCreated(armyId: ArmyId): ArmyCreatedDomainEvent {
    return new ArmyCreatedDomainEvent({ id: armyId.toString() });
  }
}
