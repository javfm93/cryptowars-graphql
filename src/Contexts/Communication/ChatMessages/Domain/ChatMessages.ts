import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { ChatMessage } from './ChatMessage';
import { Primitives } from '../../../Shared/Domain/Primitives';

export class ChatMessages extends WatchedList<ChatMessage, Primitives<ChatMessage>> {
  private constructor(initial: Array<ChatMessage>) {
    super(initial);
  }

  public compareItems(a: ChatMessage, b: ChatMessage): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<Primitives<ChatMessage>> {
    return this.currentItems.map(message => message.toPrimitives());
  }

  public static create(initialWorlds?: Array<ChatMessage>): ChatMessages {
    return new ChatMessages(initialWorlds ?? []);
  }

  public static fromPrimitives(messagesPrimitive: Array<Primitives<ChatMessage>>): ChatMessages {
    const messages = messagesPrimitive.map(ChatMessage.fromPrimitives);
    return this.create(messages);
  }
}
