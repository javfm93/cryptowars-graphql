import { User } from '../User';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';

export const initialUsers: Array<User> = [
  User.fromPrimitives({
    id: Uuid.random().toString(),
    email: 'admin@admin.com',
    password: 'P@ssw0rd'
  }).value as User
];
