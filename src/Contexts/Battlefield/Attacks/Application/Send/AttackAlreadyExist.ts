import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class AttackAlreadyExist extends DomainError {
  constructor() {
    super(`A attack with that Id already exist`);
  }

  public errorName(): 'AttackAlreadyExist' {
    return 'AttackAlreadyExist';
  }
}
