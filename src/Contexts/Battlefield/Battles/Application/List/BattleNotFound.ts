import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class BattleNotFound extends DomainError {
  constructor(army: string = '') {
    super(`Battle not found for ${army}`);
  }

  public errorName(): string {
    return 'BattleNotFoundError';
  }
}
