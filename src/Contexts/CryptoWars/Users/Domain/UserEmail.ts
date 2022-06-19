import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { InvalidEmailError } from './Errors/InvalidEmailError';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';

export class UserEmail extends ValueObject<UserEmail> {
  private constructor(readonly value: string) {
    super();
    this.value = value.toLowerCase();
  }

  public static create(value: string): Either<UserEmail, InvalidEmailError> {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.match(validEmailRegex)) {
      return failure(new InvalidEmailError(value));
    }
    return successAndReturn(new UserEmail(value));
  }
  public isEqualTo(email: UserEmail) {
    return this.toString() === email.toString();
  }

  public toString(): string {
    return this.value;
  }
}
