import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

export class WorldId extends Uuid {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): Uuid {
    return new WorldId(value);
  }
}
