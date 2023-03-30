import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class InvalidSquad extends DomainError {
  constructor(message: string) {
    super(message);
  }

  public errorName(): 'InvalidSquad' {
    return 'InvalidSquad';
  }
}
