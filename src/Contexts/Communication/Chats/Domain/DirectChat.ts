import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { Primitives } from '../../../Shared/Domain/Primitives';
import { AggregateRoot } from '../../../Shared/Domain/FlatAggregateRoot';
import { DirectChatId } from './DirectChatId';
import { DirectChatCreatedDomainEvent } from './DirectChatCreatedDomainEvent';

export enum ChatTypes {
  'direct' = 'direct'
}

export class DirectChat extends AggregateRoot {
  protected constructor(
    id: DirectChatId,
    readonly playerOneId: PlayerId,
    readonly playerTwoId: PlayerId,
    readonly createdAt: Date = new Date(),
    readonly type: ChatTypes = ChatTypes.direct
  ) {
    super(id);
  }

  public static create(id: DirectChatId, playerOne: PlayerId, playerTwo: PlayerId): DirectChat {
    const directChat = new DirectChat(id, playerOne, playerTwo);
    directChat.record(new DirectChatCreatedDomainEvent({ aggregateId: directChat.id.toString() }));
    return directChat;
  }

  toPrimitives(): Primitives<DirectChat> {
    return {
      id: this.id.toString(),
      playerOneId: this.playerOneId.toString(),
      playerTwoId: this.playerTwoId.toString(),
      createdAt: this.createdAt,
      type: this.type
    };
  }

  static fromPrimitives(plainData: Omit<Primitives<DirectChat>, 'type'>): DirectChat {
    const id = DirectChatId.create(plainData.id);
    const playerOne = PlayerId.create(plainData.playerOneId);
    const playerTwo = PlayerId.create(plainData.playerTwoId);
    const createdAt = new Date(plainData.createdAt);
    return new DirectChat(id, playerOne, playerTwo, createdAt, ChatTypes.direct);
  }
}
