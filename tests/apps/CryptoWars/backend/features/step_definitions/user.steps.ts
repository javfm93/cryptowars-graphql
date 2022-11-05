import { Given, When } from '@cucumber/cucumber';
import { agent } from './controller.steps';

export const userId = 'ef8ac118-8d7f-49cc-abec-78e0d05af80a';

Given('I am sign in', async () => {
  await agent.put(`/users/${userId}`).send({
    email: 'newUser@email.com',
    password: 'P@ssw0rd'
  });

  await agent.post('/login').send({
    username: 'newUser@email.com',
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
