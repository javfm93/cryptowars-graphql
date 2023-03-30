import { UseCase, BaseUseCase } from '../../../../Shared/Domain/BaseUseCase';
import { Result, Nothing, success } from '../../../../Shared/Aplication/Result';
import { DomainError } from '../../../../Shared/Domain/Errors/DomainError';
import { EventBus } from '../../../../Shared/Domain/EventBus';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { ChatMessageRepository } from '../../Domain/ChatMessageRepository';
import { ChatMessageContent } from '../../Domain/ChatMessageContent';
import { ChatMessageId } from '../../Domain/ChatMessageId';
import { DirectChatId } from '../../../Chats/Domain/DirectChatId';
import { ChatMessage } from '../../Domain/ChatMessage';

type SendMessageArgs = {
  id: ChatMessageId;
  messageContent: ChatMessageContent;
  senderPlayerId: PlayerId;
  chatId: DirectChatId;
};

type SendMessageResult = Result<Nothing, DomainError>;

@UseCase()
export class SendChatMessage implements BaseUseCase<SendMessageArgs, Nothing> {
  constructor(private messageRepository: ChatMessageRepository, private eventBus: EventBus) {}

  async execute(args: SendMessageArgs): Promise<SendMessageResult> {
    // check that chatId belongs to senderId
    const message = ChatMessage.create(
      args.id,
      args.messageContent,
      args.senderPlayerId,
      args.chatId
    );
    await this.messageRepository.save(message);
    await this.eventBus.publish(message.pullDomainEvents());
    return success();
  }
}
