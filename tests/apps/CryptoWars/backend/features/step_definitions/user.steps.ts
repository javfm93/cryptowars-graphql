import { Given } from '@cucumber/cucumber';
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
