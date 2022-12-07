import { DirectChatIdGenerator } from './DirectChatIdGenerator';
import { NumberGenerator } from '../../../Shared/Domain/NumberGenerator';
import { DirectChat } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChat';
import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';
import { DirectChats } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChats';
import { FindChatMessagesQuery } from '../../../../../src/Contexts/Communication/ChatMessages/Application/Find/FindChatMessagesQuery';

export class DirectChatGenerator {
  static create(chatId: DirectChatId, playerOne: PlayerId, playerTwo: PlayerId): DirectChat {
    const id = chatId.toString();
    const playerOneId = playerOne.toString();
    const playerTwoId = playerTwo.toString();
    const createdAt = new Date();
    return NumberGenerator.randomBetween1and9() > 4
      ? DirectChat.fromPrimitives({ id, playerOneId, playerTwoId, createdAt })
      : DirectChat.fromPrimitives({ id, playerTwoId, playerOneId, createdAt });
  }

  static random(): DirectChat {
    const chatId = DirectChatIdGenerator.random();
    const playerOne = PlayerIdGenerator.random();
    const playerTwo = PlayerIdGenerator.random();
    return this.create(chatId, playerOne, playerTwo);
  }

  static multipleRandom(): DirectChats {
    const directChats = Array.from({ length: NumberGenerator.randomBetween1and9() }, () =>
      this.random()
    );
    return DirectChats.create(directChats);
  }

  static randomFor(playerOne: PlayerId): DirectChat {
    const chatId = DirectChatIdGenerator.random();
    const playerTwo = PlayerIdGenerator.random();
    return this.create(chatId, playerOne, playerTwo);
  }

  static randomFrom(chatMessagesQuery: FindChatMessagesQuery): DirectChat {
    const chatId = DirectChatIdGenerator.create(chatMessagesQuery.chatId);
    const playerOne = PlayerIdGenerator.create(chatMessagesQuery.playerId);
    const playerTwo = PlayerIdGenerator.random();
    return this.create(chatId, playerOne, playerTwo);
  }

  static multipleRandomFor(playerId: PlayerId): DirectChats {
    const directChats = Array.from({ length: NumberGenerator.randomBetween1and9() }, () =>
      this.randomFor(playerId)
    );
    return DirectChats.create(directChats);
  }
}
