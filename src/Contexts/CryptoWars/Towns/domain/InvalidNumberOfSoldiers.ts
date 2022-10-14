import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class InvalidNumberOfSoldiers extends DomainError {
  constructor() {
    super(`Soldiers to train must be positive`);
  }

  public errorName(): string {
    return 'InvalidNumberOfSoldiers';
  }
}
