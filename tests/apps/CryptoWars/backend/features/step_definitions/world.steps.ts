import { Given } from '@cucumber/cucumber';
import { agent, otherUserAgent } from './controller.steps';

export const worldId = '93bf78e8-d3d6-4e5a-9c0d-ff8e57ebc29b';

Given('I joined a world', async () => {
  await agent.put(`/worlds/${worldId}/join`).send();
});

Given('Other user is in the same world', async () => {
  await otherUserAgent.put(`/worlds/${worldId}/join`).send();
});
