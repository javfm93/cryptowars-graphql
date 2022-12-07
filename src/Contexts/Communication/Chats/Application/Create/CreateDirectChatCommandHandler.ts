import { CreateDirectChatCommand } from './CreateDirectChatCommand';
import { CreateDirectChat } from './CreateDirectChat';
import { Either, EmptyResult } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { CommandClass } from '../../../../Shared/Domain/Command';
import { CommandHandler } from '../../../../Shared/Domain/CommandHandler';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { DirectChatId } from '../../Domain/DirectChatId';

export type CreateDirectChatCommandResult = Either<EmptyResult, DomainError>;

export class CreateDirectChatCommandHandler implements CommandHandler<CreateDirectChatCommand> {
  constructor(private createDirectChat: CreateDirectChat) {}

  subscribedTo(): CommandClass {
    return CreateDirectChatCommand;
  }

  async handle(command: CreateDirectChatCommand): Promise<CreateDirectChatCommandResult> {
    const id = DirectChatId.create(command.id);
    const playerOne = PlayerId.create(command.playerOneId);
    const playerTwo = PlayerId.create(command.playerTwoId);
    return this.createDirectChat.execute({ id, playerOne, playerTwo });
  }
}
