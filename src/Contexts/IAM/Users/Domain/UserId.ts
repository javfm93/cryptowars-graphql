import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

export class UserId extends Uuid {
  private constructor(value: string) {
    super(value);
  }

  static create(value: string): Uuid {
    return new UserId(value);
  }
}
