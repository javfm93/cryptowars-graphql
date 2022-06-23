import { Uuid } from '../../../Shared/Domain/value-object/Uuid';

export class PlayerId extends Uuid {
  private constructor(value: string) {
    super(value);
  }
  static create(value: string): Uuid {
    return new PlayerId(value);
  }
}
