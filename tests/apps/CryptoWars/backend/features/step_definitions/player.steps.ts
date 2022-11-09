import { Given, Then } from '@cucumber/cucumber';
import { _response, agent, otherUserAgent } from './controller.steps';
import assert from 'assert';
import { PlayerPrimitives } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { userId } from './user.steps';
import { worldId } from './world.steps';

export let player: PlayerPrimitives;
export let otherUserPlayer: PlayerPrimitives;

Given('I get my player information', async () => {
  const response = await agent.get('/player');
  player = response.body.player;
});

Given('Other user has his player information', async () => {
  const response = await otherUserAgent.get('/player');
  otherUserPlayer = response.body.player;
});

Then('The response content should match the player response:', (expectedResponse: string) => {
  expectedResponse = expectedResponse.replace(/:userId/gi, userId);
  expectedResponse = expectedResponse.replace(/:worldId/gi, worldId);

  const expected: PlayerPrimitives = JSON.parse(expectedResponse).player;
  const response: PlayerPrimitives = _response.body.player;
  assert.strictEqual(response.towns.length, 1);
  assert.strictEqual(response.towns[0].playerId, response.id);
  assert.strictEqual(response.userId, expected.userId);
  assert.deepStrictEqual(response.worlds, expected.worlds);
});
