import { UseCase } from '../../../../Shared/Domain/UseCase';
import { Either, EmptyResult, failure, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { DirectChatRepository } from '../../Domain/DirectChatRepository';
import { DirectChatId } from '../../Domain/DirectChatId';
import { DirectChat } from '../../Domain/DirectChat';
import { ChatAlreadyExistError } from './ChatAlreadyExistError';

type CreateDirectChatArgs = {
  id: DirectChatId;
  playerOne: PlayerId;
  playerTwo: PlayerId;
};

type CreateDirectChatResult = Either<EmptyResult, DomainError>;

export class CreateDirectChat implements UseCase<CreateDirectChatArgs, EmptyResult> {
  constructor(private directChatRepository: DirectChatRepository, private eventBus: EventBus) {}

  async execute(args: CreateDirectChatArgs): Promise<CreateDirectChatResult> {
    // todo: check if the player to send exists
    const existingChat = await this.directChatRepository.findDirectChatBetween(
      args.playerOne,
      args.playerTwo
    );
    if (existingChat) return failure(new ChatAlreadyExistError());
    const chat = DirectChat.create(args.id, args.playerOne, args.playerTwo);
    await this.directChatRepository.save(chat);
    await this.eventBus.publish(chat.pullDomainEvents());
    return success();
  }
}
