import { DomainError } from './DomainError';

export class UserNotFound extends DomainError {
  constructor() {
    super(`User not found`);
  }

  public errorName(): string {
    return 'UserNotFoundError';
  }
}
