import { Uuid } from '../../../Shared/domain/value-object/Uuid';

export class VillageId extends Uuid {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): Uuid {
    return new VillageId(value);
  }
}
