import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class Forbidden extends DomainError {
  constructor() {
    super(`Forbidden`);
  }

  public errorName(): string {
    return 'Forbidden';
  }
}
