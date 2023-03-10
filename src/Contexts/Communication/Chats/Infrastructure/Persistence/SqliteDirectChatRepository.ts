import { DirectChatRepository } from '../../Domain/DirectChatRepository';
import { DirectChat } from '../../Domain/DirectChat';
import {
  RegisterRepository,
  TypeOrmRepository
} from '../../../../Shared/Infrastructure/Persistence/Sqlite/TypeOrmRepository';
import { Connection, EntitySchema } from 'typeorm';
import { DirectChatSchema } from './typeorm/DirectChatSchema';
import { DirectChats } from '../../Domain/DirectChats';
import { PlayerId } from '../../../../CryptoWars/Players/Domain/PlayerId';
import { Primitives } from '../../../../Shared/Domain/Primitives';
import { NothingOr } from '../../../../Shared/Domain/Nullable';

@RegisterRepository(DirectChatRepository)
export class SqliteDirectChatRepository
  extends TypeOrmRepository<Primitives<DirectChat>>
  implements DirectChatRepository
{
  constructor(_client: Promise<Connection>) {
    super(_client);
  }

  public async save(directChat: DirectChat): Promise<void> {
    const repository = await this.repository();
    await repository.save(directChat.toPrimitives());
  }

  async findDirectChatBetween(
    playerOne: PlayerId,
    playerTwo: PlayerId
  ): Promise<NothingOr<DirectChat>> {
    const repository = await this.repository();
    const directChat = await repository.findOne({
      where: [
        { playerOneId: playerOne.toString(), playerTwoId: playerTwo.toString() },
        { playerOneId: playerTwo.toString(), playerTwoId: playerOne.toString() }
      ]
    });
    return directChat ? DirectChat.fromPrimitives(directChat) : null;
  }

  async findDirectChatsOf(playerId: PlayerId): Promise<DirectChats> {
    const repository = await this.repository();
    const directChats = await repository.find({
      where: [{ playerOneId: playerId.toString() }, { playerTwoId: playerId.toString() }]
    });
    return directChats ? DirectChats.fromPrimitives(directChats) : DirectChats.create();
  }

  protected entitySchema(): EntitySchema<Primitives<DirectChat>> {
    return DirectChatSchema;
  }
}
