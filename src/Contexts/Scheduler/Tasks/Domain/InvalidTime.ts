import { DomainError } from '../../../Shared/Domain/Errors/DomainError';

export class InvalidTime extends DomainError {
  constructor(time: number) {
    super(`The time should be later than now, provided: ${time}`);
  }

  public errorName(): string {
    return 'InvalidTime';
  }
}
