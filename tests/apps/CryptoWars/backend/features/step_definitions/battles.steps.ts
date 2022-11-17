import { Given, Then } from '@cucumber/cucumber';
import { agent } from './controller.steps';
import { otherPlayerArmy, playerArmy } from './army.steps';
import assert from 'assert';
import request from 'supertest';
import { otherUserPlayer } from './player.steps';
import { BattlesResponse } from '../../../../../../src/apps/CryptoWars/backend/Controllers/Battles/BattlesResponse';
import { attackId } from './attack.steps';

let _request: request.Test;
let _response: request.Response;

Given('I send a GET battles request with my army', () => {
  const route = `/battles?armyId=${playerArmy.id}`;
  _request = agent.get(route).send();
});

Given('I send a GET battles request to other army', () => {
  const route = `/battles?armyId=${otherPlayerArmy.id}`;
  _request = agent.get(route).send();
});

Then('The battles response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('The battles response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('The battles response content should be:', response => {
  const finalResponse: BattlesResponse = JSON.parse(
    response
      .replace(/:armyId/gi, playerArmy.id)
      .replace(/:otherPlayerTown/gi, otherUserPlayer.towns[0].id)
      .replace(/:otherPlayerId/gi, otherUserPlayer.id)
      .replace(/:otherPlayerArmy/gi, otherPlayerArmy.id)
      .replace(/:attackId/gi, attackId)
  );

  const expectedBattle = finalResponse.battles[0];
  const battle = _response.body.battles[0];
  assert.deepStrictEqual(expectedBattle.attack.attackerTroop, battle.attack.attackerTroop);
  assert.deepStrictEqual(expectedBattle.attack.id, battle.attack.id);
  assert.deepStrictEqual(expectedBattle.attack.defenderArmyId, battle.attack.defenderArmyId);
  assert.ok(battle.attack.sentAt);
  assert.deepStrictEqual(expectedBattle.defenderArmy, battle.defenderArmy);
  assert.deepStrictEqual(expectedBattle.result, battle.result);
  assert.ok(battle.finishedAt);
});
