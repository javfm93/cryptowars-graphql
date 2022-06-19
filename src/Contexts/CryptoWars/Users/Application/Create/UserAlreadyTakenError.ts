import { DomainError } from '../../Domain/Errors/DomainError';

export class UserAlreadyTakenError extends DomainError {
  constructor(email: string) {
    super(`The user with the email [${email}] is already taken`);
  }

  public errorName(): string {
    return 'UserAlreadyTaken';
  }
}
