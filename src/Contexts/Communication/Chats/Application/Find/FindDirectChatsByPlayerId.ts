import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, successAndReturn } from '../../../../Shared/Aplication/Result';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';
import { DirectChatRepository } from '../../Domain/DirectChatRepository';
import { DirectChats } from '../../Domain/DirectChats';

type FindMessageResult = Result<DirectChats, Forbidden>;

type FindMessageArgs = {
  playerId: PlayerId;
};

@UseCase()
export class FindDirectChatsByPlayerId implements BaseUseCase<FindMessageArgs, DirectChats> {
  constructor(private directChatRepository: DirectChatRepository) {}

  async execute({ playerId }: FindMessageArgs): Promise<FindMessageResult> {
    const chats = await this.directChatRepository.findDirectChatsOf(playerId);
    return successAndReturn(chats);
  }
}
