import { UuidGenerator } from '../../../Shared/Domain/UuidGenerator';
import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';

export class DirectChatIdGenerator {
  static create(value: string): DirectChatId {
    return DirectChatId.create(value);
  }

  static random(): DirectChatId {
    return this.create(UuidGenerator.random().toString());
  }
}
