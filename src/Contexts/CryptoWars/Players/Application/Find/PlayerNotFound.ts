import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class PlayerNotFound extends DomainError {
  constructor() {
    super(`Player not found`);
  }

  public errorName(): 'PlayerNotFoundError' {
    return 'PlayerNotFoundError';
  }
}
