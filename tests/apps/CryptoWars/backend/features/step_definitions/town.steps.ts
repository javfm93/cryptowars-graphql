import { Then, When } from '@cucumber/cucumber';
import { agent } from './controller.steps';
import assert from 'assert';
import request from 'supertest';
import { Uuid } from '../../../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import { player } from './player.steps';

let townRequest: request.Test;
let townResponse: request.Response;

When('I send a POST request to train-soldiers endpoint with my town and body:', (body: string) => {
  const finalRoute = '/towns/:id/train-soldiers'.replace(/:id/gi, player.towns[0].id);
  townRequest = agent.post(finalRoute).send(JSON.parse(body));
});

When(
  'I send a POST request to train-soldiers endpoint with not my town and body:',
  (body: string) => {
    const finalRoute = '/towns/:id/train-soldiers'.replace(/:id/gi, Uuid.random().toString());
    townRequest = agent.post(finalRoute).send(JSON.parse(body));
  }
);

Then('The town request response status code should be {int}', async (status: number) => {
  townResponse = await townRequest.expect(status);
});

Then('The town request response should be empty', () => {
  assert.deepStrictEqual(townResponse.body, {});
});
