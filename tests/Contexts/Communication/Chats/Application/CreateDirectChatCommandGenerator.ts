import { CreateDirectChatCommand } from '../../../../../src/Contexts/Communication/Chats/Application/Create/CreateDirectChatCommand';
import { DirectChatId } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChatId';
import { PlayerIdGenerator } from '../../../CryptoWars/Players/domain/PlayerIdGenerator';
import { PlayerId } from '../../../../../src/Contexts/CryptoWars/Players/Domain/PlayerId';
import { DirectChat } from '../../../../../src/Contexts/Communication/Chats/Domain/DirectChat';

export class CreateDirectChatCommandGenerator {
  static create(
    id: DirectChatId,
    playerOneId: PlayerId,
    playerTwoId: PlayerId
  ): CreateDirectChatCommand {
    return new CreateDirectChatCommand(
      id.toString(),
      playerOneId.toString(),
      playerTwoId.toString()
    );
  }

  static random(): CreateDirectChatCommand {
    return this.create(
      DirectChatId.random(),
      PlayerIdGenerator.random(),
      PlayerIdGenerator.random()
    );
  }

  static from(directChat: DirectChat): CreateDirectChatCommand {
    return this.create(directChat.id, directChat.playerOneId, directChat.playerTwoId);
  }
}
