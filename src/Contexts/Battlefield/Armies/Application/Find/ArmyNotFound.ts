import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class ArmyNotFound extends DomainError {
  constructor(army: string = '') {
    super(`Army ${army} not found`);
  }

  public errorName(): string {
    return 'ArmyNotFoundError';
  }
}
