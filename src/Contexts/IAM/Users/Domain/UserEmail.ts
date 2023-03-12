import { InvalidEmailError } from './Errors/InvalidEmailError';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { StringValueObject } from '../../../Shared/Domain/value-object/StringValueObject';

export class UserEmail extends StringValueObject {
  private constructor(value: string) {
    super(value.toLowerCase());
  }

  public static create(value: string): Either<UserEmail, InvalidEmailError> {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.match(validEmailRegex)) {
      return failure(new InvalidEmailError(value));
    }
    return successAndReturn(new UserEmail(value));
  }

  public static fromPrimitives(email: string): UserEmail {
    return new UserEmail(email);
  }
}
