import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';

export class InvalidNameError extends DomainError {
  constructor(Name: string) {
    super(`The format of the Name [${Name}] is not valid`);
  }

  public errorName(): 'InvalidNameError' {
    return 'InvalidNameError';
  }
}
