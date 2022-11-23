import { Uuid } from '../../../Shared/Domain/value-object/Uuid';
import { InvalidArgumentError } from '../../../Shared/Domain/value-object/InvalidArgumentError';

export class TaskId extends Uuid {
  private constructor(value: string) {
    super(value);
  }

  static create(value?: string): Uuid {
    if (!value)
      throw new InvalidArgumentError(`[${this.constructor.name}] does not allow empty value`);
    return new TaskId(value);
  }
}
