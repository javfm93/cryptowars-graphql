import { login } from '../IAM/IAMtestHelpers';
import { client } from '../start';
import { JOIN_WORLD } from './Worlds/joinWorldMutation';
import { GET_PLAYER } from './Players/getPlayerQuery';
import { hasErrors } from '../testHelpers';

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
