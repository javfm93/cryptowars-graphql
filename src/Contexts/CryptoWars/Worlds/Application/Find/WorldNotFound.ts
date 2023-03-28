import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class WorldNotFound extends DomainError {
  constructor() {
    super(`World not found`);
  }

  public errorName(): 'WorldNotFoundError' {
    return 'WorldNotFoundError';
  }
}
