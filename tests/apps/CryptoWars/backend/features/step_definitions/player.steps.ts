import { Given, Then } from '@cucumber/cucumber';
import { _response, agent } from './controller.steps';
import assert from 'assert';
import { PlayerPrimitives } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';

export const userId = 'ef8ac118-8d7f-49cc-abec-78e0d05af80a';
export const worldId = '93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b';

Given('I am sign in', async () => {
  await agent.put(`/users/${userId}`).send({
    email: 'newUser@email.com',
    password: 'P@ssw0rd'
  });

  await agent.post('/login').send({
    username: 'newUser@email.com',
    password: 'P@ssw0rd'
  });
});

Given('I selected a world', async () => {
  await agent.put('/players/select-world').send({ worldId });
});

Then('the response content should match the player response:', (expectedResponse: string) => {
  expectedResponse = expectedResponse.replace(/:userId/gi, userId);
  expectedResponse = expectedResponse.replace(/:worldId/gi, worldId);

  const expected: PlayerPrimitives = JSON.parse(expectedResponse).player;
  const response: PlayerPrimitives = _response.body.player;
  assert.strictEqual(response.towns.length, 1);
  assert.strictEqual(response.towns[0].playerId, response.id);
  assert.strictEqual(response.userId, expected.userId);
  assert.deepStrictEqual(response.worlds, expected.worlds);
});