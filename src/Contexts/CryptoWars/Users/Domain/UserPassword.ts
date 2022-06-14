import { ValueObject } from '../../../Shared/Domain/ValueObject';
import { InvalidPasswordError } from './Errors/InvalidPasswordError';

export class UserPassword extends ValueObject<UserPassword> {
  private constructor(readonly value: string) {
    super();
    this.value = value;
  }

  public static create(value: string): UserPassword {
    const hasWhitespaceRegex = /^(?=.*\s)/;
    if (hasWhitespaceRegex.test(value)) {
      throw InvalidPasswordError.shouldNotContainWhitespaces();
    }

    const containsUppercaseRegex = /^(?=.*[A-Z])/;
    if (!containsUppercaseRegex.test(value)) {
      throw InvalidPasswordError.shouldHaveAnUppercase();
    }

    const containsLowercaseRegex = /^(?=.*[a-z])/;
    if (!containsLowercaseRegex.test(value)) {
      throw InvalidPasswordError.shouldHaveALowercase();
    }

    const containsADigitRegex = /^(?=.*[0-9])/;
    if (!containsADigitRegex.test(value)) {
      throw InvalidPasswordError.shouldHaveADigit();
    }

    const containsASymbolRegex = /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹])/;
    if (!containsASymbolRegex.test(value)) {
      throw InvalidPasswordError.shouldHaveASymbol();
    }

    const hasValidLengthRegex = /^.{8,16}$/;
    if (!hasValidLengthRegex.test(value)) {
      throw InvalidPasswordError.shouldHaveValidLength();
    }
    return new UserPassword(value);
  }
  public isEqualTo(email: UserPassword) {
    return this.toString() === email.toString();
  }

  public toString(): string {
    return this.value;
  }
}
