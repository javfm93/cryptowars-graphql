import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, successAndReturn } from '../../../../Shared/Aplication/Result';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { DirectChatRepository } from '../../Domain/DirectChatRepository';
import { DirectChats } from '../../Domain/DirectChats';

type FindMessageResult = Either<DirectChats, Forbidden>;

type FindMessageArgs = {
  playerId: PlayerId;
};

@RegisterUseCase()
export class FindDirectChatsByPlayerId implements UseCase<FindMessageArgs, DirectChats> {
  constructor(private directChatRepository: DirectChatRepository) {}

  async execute({ playerId }: FindMessageArgs): Promise<FindMessageResult> {
    const chats = await this.directChatRepository.findDirectChatsOf(playerId);
    return successAndReturn(chats);
  }
}
