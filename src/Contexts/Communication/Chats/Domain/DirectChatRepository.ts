import { DirectChat } from './DirectChat';
import { DirectChats } from './DirectChats';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { NothingOr } from '../../../Shared/Domain/Nullable';

export abstract class DirectChatRepository {
  abstract findDirectChatsOf(playerId: PlayerId): Promise<DirectChats>;

  abstract findDirectChatBetween(
    playerOne: PlayerId,
    playerTwo: PlayerId
  ): Promise<NothingOr<DirectChat>>;

  abstract save(chat: DirectChat): Promise<void>;
}
