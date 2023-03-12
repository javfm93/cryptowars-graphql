import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class InvalidNumberOfSoldiers extends DomainError {
  constructor() {
    super(`Soldiers to train must be positive or you dont have enough`);
  }

  public errorName(): 'InvalidNumberOfSoldiers' {
    return 'InvalidNumberOfSoldiers';
  }
}
