import { StringValueObject } from '../../../Shared/Domain/value-object/StringValueObject';

export class ChatMessageContent extends StringValueObject {
  constructor(value: string) {
    super(value);
  }

  public static create(value: string): ChatMessageContent {
    return new ChatMessageContent(value);
  }
}
