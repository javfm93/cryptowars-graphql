import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class InvalidPasswordError extends DomainError {
  constructor(message: string) {
    super(message);
  }

  public errorName(): string {
    return 'InvalidPasswordError';
  }

  public static shouldNotContainWhitespaces(): InvalidPasswordError {
    return new InvalidPasswordError('Password should not contain Whitespaces.');
  }

  public static shouldHaveAnUppercase(): InvalidPasswordError {
    return new InvalidPasswordError('Password should have at least one Uppercase Character.');
  }

  public static shouldHaveALowercase(): InvalidPasswordError {
    return new InvalidPasswordError('Password should have at least one Lowercase Character.');
  }

  public static shouldHaveADigit(): InvalidPasswordError {
    return new InvalidPasswordError('Password must contain at least one Digit.');
  }

  public static shouldHaveASymbol(): InvalidPasswordError {
    return new InvalidPasswordError('Password must contain at least one Special Symbol.');
  }

  public static shouldHaveValidLength(): InvalidPasswordError {
    return new InvalidPasswordError('Password must be 8-16 Characters Long.');
  }
}
