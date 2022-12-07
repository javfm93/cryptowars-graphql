import { DomainEvent, OptionalDomainEventProps } from '../../../Shared/Domain/DomainEvent';
import { Primitives } from '../../../Shared/Domain/Primitives';

type Attributes = {
  senderPlayerId: string;
  chatId: string;
  content: string;
};

export class ChatMessageSentDomainEvent extends DomainEvent<Attributes> {
  static readonly TYPE = 'communication.1.event.chatMessage.sent';

  constructor(props: OptionalDomainEventProps<ChatMessageSentDomainEvent>) {
    const { aggregateId, id, occurredOn, attributes, meta } = props;
    super(ChatMessageSentDomainEvent.TYPE, aggregateId, attributes, meta, occurredOn, id);
  }

  static fromPrimitives(
    primitives: Primitives<ChatMessageSentDomainEvent>
  ): ChatMessageSentDomainEvent {
    return new ChatMessageSentDomainEvent(primitives);
  }
}
