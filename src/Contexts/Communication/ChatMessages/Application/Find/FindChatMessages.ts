import { RegisterUseCase, UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, failure, successAndReturn } from '../../../../Shared/Aplication/Result';
import { UserId } from '../../../../IAM/Users/Domain/UserId';
import { ChatMessages } from '../../Domain/ChatMessages';
import { ChatMessageRepository } from '../../Domain/ChatMessageRepository';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Forbidden } from '../../../../Shared/Domain/Errors/Forbidden';

type FindMessageResult = Either<ChatMessages, Forbidden>;

type FindMessageArgs = {
  playerId: PlayerId;
  chatId: UserId;
};

@RegisterUseCase()
export class FindChatMessages implements UseCase<FindMessageArgs, ChatMessages> {
  constructor(private messageRepository: ChatMessageRepository) {}

  async execute({ playerId, chatId }: FindMessageArgs): Promise<FindMessageResult> {
    const messages = await this.messageRepository.findByDirectChat(chatId);
    return messages ? successAndReturn(messages) : failure(new Forbidden());
  }
}
