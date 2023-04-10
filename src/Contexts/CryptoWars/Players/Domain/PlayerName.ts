import { Result, successAndReturn } from '../../../Shared/Aplication/Result';
import { StringValueObject } from '../../../Shared/Domain/value-object/StringValueObject';

export class PlayerName extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<PlayerName, null> {
    return successAndReturn(new PlayerName(value));
  }

  public static fromPrimitives(name: string): PlayerName {
    return new PlayerName(name);
  }
}
