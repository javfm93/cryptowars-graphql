import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { Either, successAndReturn } from '../../../Shared/Aplication/Result';
import { DomainError } from '../../Users/Domain/Errors/DomainError';

export class WorldName extends ValueObject<WorldName> {
  private constructor(readonly value: string) {
    super();
    this.value = value;
  }

  public static create(value: string): Either<WorldName, DomainError> {
    return successAndReturn(new WorldName(value));
  }
  public isEqualTo(world: WorldName) {
    return this.toString() === world.toString();
  }

  public toString(): string {
    return this.value;
  }
}
