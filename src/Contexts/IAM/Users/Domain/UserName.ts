import { Result, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { StringValueObject } from '../../../Shared/Domain/value-object/StringValueObject';
import { InvalidNameError } from './Errors/InvalidNameError';

export class UserName extends StringValueObject {
  private constructor(value: string) {
    super(value);
  }

  public static create(value: string): Result<UserName, InvalidNameError> {
    const validUserNameRegex = /^(\w|-|_|\.){4,24}$/;

    if (!value.match(validUserNameRegex)) {
      return failure(new InvalidNameError(value));
    }
    return successAndReturn(new UserName(value));
  }

  public static fromPrimitives(name: string): UserName {
    return new UserName(name);
  }
}
