import { Given, Then } from '@cucumber/cucumber';
import { agent } from './controller.steps';
import { otherUserPlayer } from './player.steps';
import { otherPlayerArmy, playerArmy } from './army.steps';
import assert from 'assert';
import request from 'supertest';

let _request: request.Test;
export let _response: request.Response;
Given('I send a PUT attack request to {string} with body:', (route: string, body: string) => {
  const finalBody = body
    .replace(/:armyId/gi, playerArmy?.id)
    .replace(/:otherPlayerTown/gi, otherUserPlayer?.towns[0].id)
    .replace(/:otherPlayerArmy/gi, otherPlayerArmy?.id);

  console.log(finalBody);
  _request = agent.put(route).send(JSON.parse(finalBody));
});

Then('The attack response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('The attack response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});
