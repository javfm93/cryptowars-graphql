import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class ChatAlreadyExistError extends DomainError {
  constructor() {
    super(`The chat already exist`);
  }

  public errorName(): string {
    return 'ChatAlreadyExist';
  }
}
