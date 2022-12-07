import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { ChatMessage } from '../../../../../../Contexts/Communication/ChatMessages/Domain/ChatMessage';

export type DirectChatMessagesResponse = {
  messages: Array<Primitives<ChatMessage>>;
};
