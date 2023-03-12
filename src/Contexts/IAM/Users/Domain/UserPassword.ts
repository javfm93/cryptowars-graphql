import { InvalidPasswordError } from './Errors/InvalidPasswordError';
import { Either, failure, successAndReturn } from '../../../Shared/Aplication/Result';
import { StringValueObject } from '../../../Shared/Domain/value-object/StringValueObject';

export class UserPassword extends StringValueObject {
  private constructor(value: string) {
    super(value);
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
    return successAndReturn(new UserPassword(value));
  }

  public static fromPrimitives(password: string): UserPassword {
    return new UserPassword(password);
  }
}
