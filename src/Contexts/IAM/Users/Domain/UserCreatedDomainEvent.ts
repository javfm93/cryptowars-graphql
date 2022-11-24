import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class UserCreatedDomainEvent extends DomainEvent<{}> {
  static readonly TYPE = 'cryptoWars.1.event.user.created';

  constructor(props: OptionalDomainEventProps<UserCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(UserCreatedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(primitives: Primitives<UserCreatedDomainEvent>): UserCreatedDomainEvent {
    return new UserCreatedDomainEvent(primitives);
  }
}
