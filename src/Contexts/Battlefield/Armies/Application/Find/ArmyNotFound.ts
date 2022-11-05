import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class ArmyNotFound extends DomainError {
  constructor() {
    super(`Army not found`);
  }

  public errorName(): string {
    return 'ArmyNotFoundError';
  }
}
