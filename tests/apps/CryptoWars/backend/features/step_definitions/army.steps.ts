import { Given, Then, When } from '@cucumber/cucumber';
import { agent, otherUserAgent } from './controller.steps';
import { otherUserPlayer, player } from './player.steps';
import request from 'supertest';
import assert from 'assert';
import { Primitives } from '../../../../../../src/Contexts/Shared/Domain/Primitives';
import { Army } from '../../../../../../src/Contexts/Battlefield/Armies/Domain/Army';

let armyRequest: request.Test;
let armyResponse: request.Response;
export let playerArmy: Primitives<Army>;
export let otherPlayerArmy: Primitives<Army>;

export const retrievePlayerArmyInformation = async () => {
  const finalRoute = '/army?townId=:townId'.replace(/:townId/gi, player.towns[0].id);
  const response = await agent.get(finalRoute).send();
  playerArmy = response.body.army;
};

export const retrieveOtherPlayerArmyInformation = async () => {
  const finalRoute = '/army?townId=:townId'.replace(/:townId/gi, otherUserPlayer.towns[0].id);
  const response = await otherUserAgent.get(finalRoute).send();
  otherPlayerArmy = response.body.army;
  console.log('-----------', otherPlayerArmy.squads);
};

Given('I have {int} basic soldiers in my army', async (numberOfSoldiers: number) => {
  const finalRoute = '/towns/:id/train-soldiers'.replace(/:id/gi, player.towns[0].id);
  await agent.post(finalRoute).send({
    soldiers: {
      basic: numberOfSoldiers
    }
  });
});

Given('Other player has {int} basic soldiers in his army', async (numberOfSoldiers: number) => {
  const finalRoute = '/towns/:id/train-soldiers'.replace(/:id/gi, otherUserPlayer.towns[0].id);
  await otherUserAgent.post(finalRoute).send({
    soldiers: {
      basic: numberOfSoldiers
    }
  });
});

Given('I get my army', async () => {
  await retrievePlayerArmyInformation();
});

Given('Other player get his army', async () => {
  await retrieveOtherPlayerArmyInformation();
});

When('I send a GET request to my town army', async () => {
  const finalRoute = '/army?townId=:townId'.replace(/:townId/gi, player.towns[0].id);
  armyRequest = agent.get(finalRoute).send();
});

When('I send a GET request to the other user army', async () => {
  const finalRoute = '/army?townId=:townId'.replace(/:townId/gi, otherUserPlayer.towns[0].id);
  armyRequest = agent.get(finalRoute).send();
});

Then('The army response status code should be {int}', async (status: number) => {
  armyResponse = await armyRequest.expect(status);
});

Then('The army response should be empty', () => {
  assert.deepStrictEqual(armyResponse.body, {});
});

Then('The army response should contain:', async (body: string) => {
  const expectedResponse = JSON.parse(body);
  assert.strictEqual(armyResponse.body.army.playerId, player.id);
  assert.strictEqual(armyResponse.body.army.townId, player.towns[0].id);
  assert.deepStrictEqual(armyResponse.body.army.squads, expectedResponse.squads);
});

Then('My Army should have {int} soldiers', async (numberOfSoldiers: number) => {
  assert.strictEqual(playerArmy.squads[0].soldiers, numberOfSoldiers);
});
