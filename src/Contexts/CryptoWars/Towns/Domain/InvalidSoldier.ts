import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class InvalidSoldier extends DomainError {
  constructor(invalidSoldier: string) {
    super(`Invalid soldier to train: ${invalidSoldier}`);
  }

  public errorName(): 'InvalidSoldier' {
    return 'InvalidSoldier';
  }
}
