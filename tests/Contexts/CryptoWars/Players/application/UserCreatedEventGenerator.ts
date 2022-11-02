import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { UserCreatedDomainEvent } from '../../../../../src/Contexts/IAM/Users/Domain/UserCreatedDomainEvent';

export class UserCreatedEventGenerator {
  static create(id: string): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({ id });
  }

  static random(): UserCreatedDomainEvent {
    return this.create(UuidGenerator.random().toString());
  }
}
