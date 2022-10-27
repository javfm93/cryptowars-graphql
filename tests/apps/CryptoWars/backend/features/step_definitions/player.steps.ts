import { Given, Then, When } from '@cucumber/cucumber';
import { _response, agent } from './controller.steps';
import assert from 'assert';
import { PlayerPrimitives } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import request from 'supertest';
import { Uuid } from '../../../../../../src/Contexts/Shared/Domain/value-object/Uuid';

export const userId = 'ef8ac118-8d7f-49cc-abec-78e0d05af80a';
export const worldId = '93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b';
let player: PlayerPrimitives;
let playerRequest: request.Test;
let playerResponse: request.Response;

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

Given('I got my towns information', async () => {
  const response = await agent.get('/player');
  player = response.body.player;
});

When('I send a POST request to train-soldiers endpoint with my town and body:', (body: string) => {
  const finalRoute = '/towns/:townId/train-soldiers'.replace(/:townId/gi, player.towns[0].id);
  playerRequest = agent.post(finalRoute).send(JSON.parse(body));
});

When(
  'I send a POST request to train-soldiers endpoint with not my town and body:',
  (body: string) => {
    const finalRoute = '/towns/:townId/train-soldiers'.replace(/:townId/gi, Uuid.random().toString);
    playerRequest = agent.post(finalRoute).send(JSON.parse(body));
  }
);

Then('the player request response status code should be {int}', async (status: number) => {
  playerResponse = await playerRequest.expect(status);
});

Then('the player request response should be empty', () => {
  assert.deepStrictEqual(playerResponse.body, {});
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
