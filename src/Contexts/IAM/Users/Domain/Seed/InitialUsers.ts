import { User } from '../User';
import { Uuid } from '../../../../Shared/Domain/value-object/Uuid';

// const salt = bcrypt.genSaltSync(10);
// const hash = bcrypt.hashSync('P@ssw0rd', salt);
export const initialUsers: Array<User> = [
  User.fromPrimitives({
    id: Uuid.random().toString(),
    email: 'admin@admin.com',
    password: 'P@ssw0rd'
  })
];
