import { DomainError } from './DomainError';

export class InvalidEmailError extends DomainError {
  constructor(email: string) {
    super(`The format of the email [${email}] is not valid`);
  }

  public errorName(): string {
    return 'InvalidEmailError';
  }
}
