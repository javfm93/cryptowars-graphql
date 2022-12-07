import { EntitySchema } from 'typeorm';
import { ChatMessage } from '../../../Domain/ChatMessage';
import { Primitives } from '../../../../../Shared/Domain/Primitives';

export const ChatMessageSchema = new EntitySchema<Primitives<ChatMessage>>({
  name: 'Message',
  tableName: 'messages',
  columns: {
    id: {
      type: String,
      primary: true
    },
    messageContent: {
      type: String
    },
    senderPlayerId: {
      type: String
    },
    chatId: {
      type: String
    },
    createdAt: {
      type: 'datetime',
      nullable: false
    },
    status: {
      type: String,
      nullable: false
    }
  }
});
