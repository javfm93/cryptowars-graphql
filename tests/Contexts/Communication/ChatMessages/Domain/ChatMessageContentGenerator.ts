import { ChatMessageContent } from '../../../../../src/Contexts/Communication/ChatMessages/Domain/ChatMessageContent';
import * as faker from 'faker';

export class ChatMessageContentGenerator {
  static create(value: string): ChatMessageContent {
    return ChatMessageContent.create(value);
  }

  static random(): ChatMessageContent {
    return this.create(faker.random.words());
  }
}
