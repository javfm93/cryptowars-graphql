import { DomainError } from './DomainError';

export class Forbidden extends DomainError {
  constructor() {
    super(`Forbidden`);
  }

  public errorName(): string {
    return 'Forbidden';
  }
}
