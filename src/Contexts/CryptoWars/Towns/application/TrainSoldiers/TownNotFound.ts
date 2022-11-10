import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class TownNotFound extends DomainError {
  constructor() {
    super(`Town not found`);
  }

  public errorName(): string {
    return 'TownNotFoundError';
  }
}
