import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class PlayerNotFound extends DomainError {
  constructor(playerId: string) {
    super(`The player with id [${playerId}] was not found`);
  }

  public errorName(): string {
    return 'PlayerNotFound';
  }
}
