import { DirectChatCreatedDomainEvent } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatCreatedDomainEvent';

export class DirectChatEventsGenerator {
  static created(directChatId: string): DirectChatCreatedDomainEvent {
    return new DirectChatCreatedDomainEvent({
      aggregateId: directChatId
    });
  }
}
