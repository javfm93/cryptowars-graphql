import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { UserCreatedDomainEvent } from '../../../../../src/Contexts/IAM/Users/Domain/UserCreatedDomainEvent';

export class UserCreatedEventGenerator {
  static create(aggregateId: string): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent({ aggregateId });
  }

  static random(): UserCreatedDomainEvent {
    return this.create(UuidGenerator.random().toString());
  }
}
