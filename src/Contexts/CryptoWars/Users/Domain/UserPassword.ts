import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { InvalidEmailError } from './InvalidEmailError';

export class UserEmail extends ValueObject<UserEmail> {
  private constructor(readonly value: string) {
    super();
    this.value = value.toLowerCase();
  }

  public static create(value: string): UserEmail {
    const validEmailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (!value.match(validEmailRegex)) {
      throw InvalidEmailError;
    }
    return new UserEmail(value);
  }
  public isEqualTo(email: UserEmail) {
    return this.toString() === email.toString();
  }

  public toString(): string {
    return this.value;
  }
}
