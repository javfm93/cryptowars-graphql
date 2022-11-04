import { UuidGenerator } from '../../Shared/Domain/UuidGenerator';
import { ArmyId } from '../../../../src/Contexts/Battlefield/Armies/Domain/ArmyId';

export class ArmyIdGenerator {
  static create(value: string): ArmyId {
    return ArmyId.create(value);
  }

  static random(): ArmyId {
    return this.create(UuidGenerator.random().toString());
  }
}
