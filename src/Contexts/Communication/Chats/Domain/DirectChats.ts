import { Primitives } from '../../../Shared/Domain/Primitives';
import { WatchedList } from '../../../Shared/Domain/WatchedList';
import { DirectChat } from './DirectChat';

export class DirectChats extends WatchedList<DirectChat> {
  private constructor(initial: Array<DirectChat>) {
    super(initial);
  }

  public compareItems(a: DirectChat, b: DirectChat): boolean {
    return a.isEqualTo(b);
  }

  public toPrimitives(): Array<Primitives<DirectChat>> {
    return this.currentItems.map(chat => chat.toPrimitives());
  }

  public static create(initialWorlds?: Array<DirectChat>): DirectChats {
    return new DirectChats(initialWorlds ?? []);
  }

  public static fromPrimitives(chatsPrimitive: Array<Primitives<DirectChat>>): DirectChats {
    const chats = chatsPrimitive.map(DirectChat.fromPrimitives);
    return this.create(chats);
  }
}
