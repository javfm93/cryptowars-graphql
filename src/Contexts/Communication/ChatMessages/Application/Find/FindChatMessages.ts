import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { ChatMessages } from '../../Domain/ChatMessages';
import { ChatMessageRepository } from '../../Domain/ChatMessageRepository';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';

type FindMessageResult = Result<ChatMessages, Forbidden>;

type FindMessageArgs = {
  playerId: PlayerId;
  chatId: UserId;
};

@UseCase()
export class FindChatMessages implements BaseUseCase<FindMessageArgs, ChatMessages> {
  constructor(private messageRepository: ChatMessageRepository) {}

  async execute({ playerId, chatId }: FindMessageArgs): Promise<FindMessageResult> {
    const messages = await this.messageRepository.findByDirectChat(chatId);
    return messages ? successAndReturn(messages) : failure(new Forbidden());
  }
}
