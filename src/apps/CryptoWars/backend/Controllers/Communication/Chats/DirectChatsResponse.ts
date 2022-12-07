import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { DirectChat } from '../../../../../../Contexts/Communication/Chats/Domain/DirectChat';

export type DirectChatsResponse = {
  chats: Array<Primitives<DirectChat>>;
};
