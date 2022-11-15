import { Given, Then } from '@cucumber/cucumber';
import { _response, agent, otherUserAgent } from './controller.steps';
import assert from 'assert';
import { PlayerPrimitives } from '../../../../../../src/Contexts/CryptoWars/Players/Domain/Player';
import { userId } from './user.steps';
import { worldId } from './world.steps';

export let player: PlayerPrimitives;
export let otherUserPlayer: PlayerPrimitives;

export const retrievePlayerInformation = async () => {
  const response = await agent.get('/player');
  player = response.body.player;
};

Given('I get my player information', async () => {
  await retrievePlayerInformation();
});

Given('Other user has his player information', async () => {
  const response = await otherUserAgent.get('/player');
  otherUserPlayer = response.body.player;
});

Then('The response content should match the player response:', (expectedResponse: string) => {
  const response: PlayerPrimitives = _response.body.player;
  const essenceUpdatedAt = response.towns[0].buildings.warehouse.assets[0].lastStorageUpdate;

  expectedResponse = expectedResponse.replace(/:userId/gi, userId);
  expectedResponse = expectedResponse.replace(/:worldId/gi, worldId);
  expectedResponse = expectedResponse.replace(/:isoTimeNow/gi, essenceUpdatedAt);
  const expected: PlayerPrimitives = JSON.parse(expectedResponse).player;

  assert.strictEqual(response.towns.length, 1);
  assert.strictEqual(response.towns[0].playerId, response.id);
  assert.deepStrictEqual(response.towns[0].buildings, expected.towns[0].buildings);
  assert.strictEqual(response.userId, expected.userId);
  assert.deepStrictEqual(response.worlds, expected.worlds);
});
