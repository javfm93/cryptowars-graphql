import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { InvalidPasswordError } from './Errors/InvalidPasswordError';
import { Either, failure, success } from '../../../Shared/Aplication/Result';

export class UserPassword extends ValueObject<UserPassword> {
  private constructor(readonly value: string) {
    super();
    this.value = value;
  }

  public static create(value: string): Either<UserPassword, InvalidPasswordError> {
    const hasWhitespaceRegex = /^(?=.*\s)/;
    if (hasWhitespaceRegex.test(value)) {
      return failure(InvalidPasswordError.shouldNotContainWhitespaces());
    }

    const containsUppercaseRegex = /^(?=.*[A-Z])/;
    if (!containsUppercaseRegex.test(value)) {
      return failure(InvalidPasswordError.shouldHaveAnUppercase());
    }

    const containsLowercaseRegex = /^(?=.*[a-z])/;
    if (!containsLowercaseRegex.test(value)) {
      return failure(InvalidPasswordError.shouldHaveALowercase());
    }

    const containsADigitRegex = /^(?=.*[0-9])/;
    if (!containsADigitRegex.test(value)) {
      return failure(InvalidPasswordError.shouldHaveADigit());
    }

    const containsASymbolRegex = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!containsASymbolRegex.test(value)) {
      return failure(InvalidPasswordError.shouldHaveASymbol());
    }

    const hasValidLengthRegex = /^.{8,16}$/;
    if (!hasValidLengthRegex.test(value)) {
      return failure(InvalidPasswordError.shouldHaveValidLength());
    }
    return success(new UserPassword(value));
  }
  public isEqualTo(email: UserPassword) {
    return this.toString() === email.toString();
  }

  public toString(): string {
    return this.value;
  }
}
