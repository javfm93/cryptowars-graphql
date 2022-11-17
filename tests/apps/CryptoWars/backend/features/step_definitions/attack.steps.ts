import { Given, Then } from '@cucumber/cucumber';
import { agent } from './controller.steps';
import { otherUserPlayer } from './player.steps';
import { otherPlayerArmy, playerArmy } from './army.steps';
import assert from 'assert';
import request from 'supertest';
import { v4 } from 'uuid';

let _request: request.Test;
let _response: request.Response;

export const attackId = v4();

Given('I send a PUT attack request to {string} with body:', (route: string, body: string) => {
  const finalBody = body
    .replace(/:armyId/gi, playerArmy?.id)
    .replace(/:otherPlayerTown/gi, otherUserPlayer?.towns[0].id)
    .replace(/:otherPlayerArmy/gi, otherPlayerArmy?.id);
  _request = agent.put(route).send(JSON.parse(finalBody));
});

Given('I send an attack with 2 basic soldiers', async () => {
  const route = `/attacks/${attackId}`;
  const body = {
    attackerArmy: playerArmy.id,
    defenderTown: otherUserPlayer.towns[0].id,
    soldiers: {
      basic: 2
    }
  };
  await agent.put(route).send(body);
});

Then('The attack response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('The attack response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('The attack response content should be:', response => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});
