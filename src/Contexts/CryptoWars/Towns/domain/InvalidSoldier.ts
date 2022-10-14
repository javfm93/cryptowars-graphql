import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class InvalidSoldier extends DomainError {
  constructor(invalidSoldier: string) {
    super(`Invalid solid to train: ${invalidSoldier}`);
  }

  public errorName(): string {
    return 'InvalidSoldier';
  }
}
