import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class AttackNotFound extends DomainError {
  constructor(attack: string = '') {
    super(`Army ${attack} not found`);
  }

  public errorName(): string {
    return 'ArmyNotFoundError';
  }
}
