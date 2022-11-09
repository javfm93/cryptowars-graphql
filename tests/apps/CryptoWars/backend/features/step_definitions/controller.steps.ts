import assert from 'assert';
import request from 'supertest';
import { EnvironmentArranger } from '../../../../../Contexts/Shared/Infrastructure/arranger/EnvironmentArranger';
import container from '../../../../../../src/apps/CryptoWars/backend/dependency-injection';
import { CryptoWarsBackendApp } from '../../../../../../src/apps/CryptoWars/backend/CryptoWarsBackendApp';
import { AfterAll, Before, BeforeAll, Given, Then, When } from '@cucumber/cucumber';

let _request: request.Test;
export let _response: request.Response;
let application: CryptoWarsBackendApp;
export let agent: request.SuperAgentTest;
export let otherUserAgent: request.SuperAgentTest;

BeforeAll(async () => {
  application = new CryptoWarsBackendApp();
  await application.start();
});

Before(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'CryptoWars.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();
  agent = request.agent(application.httpServer);
  otherUserAgent = request.agent(application.httpServer);
});

AfterAll(async () => {
  const environmentArranger: Promise<EnvironmentArranger> = container.get(
    'CryptoWars.EnvironmentArranger'
  );
  await (await environmentArranger).arrange();
  await (await environmentArranger).close();
  await application.stop();
});

When('I send a GET request to {string}', (route: string) => {
  _request = agent.get(route);
});

Given('I send a PUT request to {string}:', (route: string) => {
  _request = agent.put(route).send();
});

Given('I send a PUT request to {string} with body:', (route: string, body: string) => {
  _request = agent.put(route).send(JSON.parse(body));
});

Given('I send a POST request to {string} with body:', (route: string, body: string) => {
  _request = agent.post(route).send(JSON.parse(body));
});

Then('the response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('the response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('the response content should be:', response => {
  assert.deepStrictEqual(_response.body, JSON.parse(response));
});
