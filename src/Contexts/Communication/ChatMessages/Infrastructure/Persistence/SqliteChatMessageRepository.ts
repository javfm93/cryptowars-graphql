import { ChatMessageRepository } from '../../Domain/ChatMessageRepository';
import { ChatMessage } from '../../Domain/ChatMessage';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { Connection, EntitySchema } from 'typeorm';
import { ChatMessageSchema } from './typeorm/ChatMessageSchema';
import { ChatMessages } from '../../Domain/ChatMessages';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import { DirectChatId } from '../../../Chats/Domain/DirectChatId';

@RegisterRepository(ChatMessageRepository)
export class SqliteChatMessageRepository
  extends TypeOrmRepository<Primitives<ChatMessage>>
  implements ChatMessageRepository
{
  constructor(_client: Promise<Connection>) {
    super(_client);
  }

  public async save(message: ChatMessage): Promise<void> {
    const repository = await this.repository();
    await repository.save(message.toPrimitives());
  }

  async findByDirectChat(chatId: DirectChatId): Promise<ChatMessages> {
    const repository = await this.repository();
    const messages = await repository.find({
      where: { chatId: chatId.toString() }
    });
    return ChatMessages.fromPrimitives(messages);
  }

  protected entitySchema(): EntitySchema<Primitives<ChatMessage>> {
    return ChatMessageSchema;
  }
}
