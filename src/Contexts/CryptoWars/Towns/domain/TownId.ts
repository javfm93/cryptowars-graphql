import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

export class TownId extends Uuid {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): Uuid {
    return new TownId(value);
  }

  static createRandom(): Uuid {
    return new TownId(Uuid.random().toString());
  }
}
