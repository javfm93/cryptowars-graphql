import { EntitySchema } from 'typeorm';
import { UserPrimitives } from '../../../Domain/User';

export const UserSchema = new EntitySchema<UserPrimitives>({
  name: 'User',
  tableName: 'users',
  columns: {
    id: {
      type: String,
      primary: true
    },
    email: {
      type: String,
      unique: true
    },
    password: {
      type: String
    }
  }
});
