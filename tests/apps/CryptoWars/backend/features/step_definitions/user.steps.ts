import { Given, When } from '@cucumber/cucumber';
import { agent, otherUserAgent } from './controller.steps';

export const userId = 'ef8ac118-8d7f-49cc-abec-78e0d05af80a';
export const otherUserId = '7c3c1cae-b473-41e7-9a3b-0b2ce2682a87';

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

Given('Other user is signed in', async () => {
  await otherUserAgent.put(`/users/${otherUserId}`).send({
    email: 'otherUser@email.com',
    password: 'P@ssw0rd'
  });

  await otherUserAgent.post('/login').send({
    username: 'otherUser@email.com',
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
