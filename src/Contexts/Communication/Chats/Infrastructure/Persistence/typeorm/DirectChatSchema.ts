import { EntitySchema } from 'typeorm';
import { DirectChat } from '../../../Domain/DirectChat';
import { Primitives } from '../../../../../Shared/Domain/Primitives';

export const DirectChatSchema = new EntitySchema<Primitives<DirectChat>>({
  name: 'DirectChat',
  tableName: 'directChats',
  indices: [
    {
      unique: true,
      columns: ['playerOneId', 'playerTwoId']
    }
  ],
  uniques: [
    {
      columns: ['playerOneId', 'playerTwoId']
    }
  ],
  columns: {
    id: {
      type: String,
      primary: true
    },
    playerOneId: {
      type: String
    },
    playerTwoId: {
      type: String
    },
    createdAt: {
      type: 'datetime',
      nullable: false
    }
  },
  relations: {}
});
