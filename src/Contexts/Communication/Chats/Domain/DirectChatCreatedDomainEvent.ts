import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class DirectChatCreatedDomainEvent extends DomainEvent<{}> {
  static readonly TYPE = 'communication.1.event.directChat.created';

  constructor(props: OptionalDomainEventProps<DirectChatCreatedDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(DirectChatCreatedDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(
    primitives: Primitives<DirectChatCreatedDomainEvent>
  ): DirectChatCreatedDomainEvent {
    return new DirectChatCreatedDomainEvent(primitives);
  }
}
