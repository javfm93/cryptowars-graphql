import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`The format of the email [${email}] is not valid`);
  }

  public errorName(): 'InvalidEmailError' {
    return 'InvalidEmailError';
  }
}
