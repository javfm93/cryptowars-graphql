import { BaseError } from './__generated__/graphql';
import { UserGenerator } from '../../../Contexts/IAM/Users/Domain/UserGenerator';
import { client } from './start';
import { CREATE_USER } from './IAM/Users/createUserMutation';
import { LOGIN } from './IAM/Auth/LoginMutation';
import { JOIN_WORLD } from './CryptoWars/Worlds/joinWorldMutation';
import { GET_PLAYER } from './CryptoWars/Players/getPlayerQuery';

export const hasErrors = function <T>(operation: object): operation is BaseError {
  return 'error' in operation;
};

export const hasDomainErrors = function <T>(operation: object): operation is BaseError {
  return 'error' in operation;
};

export const hasResult = function <T extends { entity: unknown }>(
  operation: object
): operation is T {
  return 'entity' in operation;
};

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

export const createPlayerInWorld = async () => {
  await login();
  await client.mutate({
    mutation: JOIN_WORLD,
    variables: { id: genesisWorld.id }
  });
  return getPlayer();
};

export const getPlayer = async () => {
  const result = await client.query({
    query: GET_PLAYER
  });

  if (!hasErrors(result.data.GetPlayer)) {
    return result.data.GetPlayer;
  } else {
    throw new Error('Error while creating a player in world');
  }
};

export const genesisWorld = { id: '93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b', name: 'Genesis World' };
