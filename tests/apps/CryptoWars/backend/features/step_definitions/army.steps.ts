import { Given, Then, When } from '@cucumber/cucumber';
import { agent } from './controller.steps';
import { player } from './player.steps';
import request from 'supertest';
import assert from 'assert';

let armyRequest: request.Test;
let armyResponse: request.Response;

Given('I have 2 basic soldiers in my army', async () => {
  const finalRoute = '/towns/:id/train-soldiers'.replace(/:id/gi, player.towns[0].id);
  agent.post(finalRoute).send({
    soldiers: {
      basic: 2
    }
  });
});

When('I send a GET request to my town army', async () => {
  const finalRoute = '/army?townId=:townId'.replace(/:townId/gi, player.towns[0].id);
  armyRequest = agent.get(finalRoute).send();
});

Then('The army response status code should be {int}', async (status: number) => {
  armyResponse = await armyRequest.expect(status);
});

Then('The army response should contain:', async (body: string) => {
  console.log(body);
  // const soldiers: TownSoldiersPrimitives = JSON.parse(body);
  // todo: return the soldiers
  assert.strictEqual(armyResponse.body.army.playerId, player.id);
  assert.strictEqual(armyResponse.body.army.townId, player.towns[0].id);
  // assert.deepStrictEqual(armyResponse.body.soldiers, soldiers);
});
