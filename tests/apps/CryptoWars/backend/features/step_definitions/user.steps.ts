import { Given, When } from '@cucumber/cucumber';
import { agent, otherUserAgent } from './controller.steps';
import { Uuid } from '../../../../../../src/Contexts/Shared/Domain/value-object/Uuid';
import * as faker from 'faker';

export const userId = Uuid.random().value;
export const otherUserId = Uuid.random().value;

Given('I am sign in', async () => {
  const email = faker.internet.email();
  await agent.put(`/users/${userId}`).send({
    email,
    password: 'P@ssw0rd'
  });

  await agent.post('/login').send({
    username: email,
    password: 'P@ssw0rd'
  });
});

Given('Other user is signed in', async () => {
  const email = faker.internet.email();
  await otherUserAgent.put(`/users/${otherUserId}`).send({
    email: email,
    password: 'P@ssw0rd'
  });

  await otherUserAgent.post('/login').send({
    username: email,
    password: 'P@ssw0rd'
  });
});

When(
  'I log in with email {string} and password {string}',
  async (email: string, password: string) => {
    await agent.post('/login').send({
      username: email,
      password
    });
  }
);
