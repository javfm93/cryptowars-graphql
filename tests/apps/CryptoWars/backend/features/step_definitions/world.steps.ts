import { Given, Then } from '@cucumber/cucumber';
import { agent, otherUserAgent } from './controller.steps';
import request from 'supertest';
import { otherUserPlayer, player } from './player.steps';
import assert from 'assert';

export const worldId = '93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b';
let _request: request.Test;
let _response: request.Response;

Given('I joined a world', async () => {
  await agent.put(`/worlds/${worldId}/join`).send();
});

Given('Other user is in the same world', async () => {
  await otherUserAgent.put(`/worlds/${worldId}/join`).send();
});

Given('I send a GET world request to {string}', (route: string) => {
  _request = agent.get(route).send();
});

Then('The world response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('The world response content should be:', (response: string) => {
  const finalResponse = response
    .replace(/:townId/gi, player.towns[0].id)
    .replace(/:playerId/gi, player.id)
    .replace(/:otherPlayerTownId/gi, otherUserPlayer.towns[0].id)
    .replace(/:otherPlayerId/gi, otherUserPlayer.id);
  assert.deepStrictEqual(_response.body, JSON.parse(finalResponse));
});
