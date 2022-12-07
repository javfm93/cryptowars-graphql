import { DirectChat } from './DirectChat';
import { DirectChats } from './DirectChats';
import { PlayerId } from '../../../CryptoWars/Players/Domain/PlayerId';
import { NothingOr } from '../../../Shared/Domain/Nullable';

export interface DirectChatRepository {
  findDirectChatsOf(playerId: PlayerId): Promise<DirectChats>;

  findDirectChatBetween(playerOne: PlayerId, playerTwo: PlayerId): Promise<NothingOr<DirectChat>>;

  save(chat: DirectChat): Promise<void>;
}
