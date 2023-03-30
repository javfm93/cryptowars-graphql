import { UserGenerator } from '../../../../Contexts/IAM/Users/Domain/UserGenerator';
import { client } from '../start';
import { CREATE_USER } from './Users/createUserMutation';
import { LOGIN } from './Auth/LoginMutation';

export const createUser = async () => {
  const user = UserGenerator.random();
  await client.mutate({
    mutation: CREATE_USER,
    variables: {
      user: user.toPrimitives()
    }
  });
  return user;
};

export const login = async () => {
  const user = await createUser();
  await client.mutate({
    mutation: LOGIN,
    variables: {
      login: {
        email: user.email.toString(),
        password: user.password.toString()
      }
    }
  });

  return user;
};
