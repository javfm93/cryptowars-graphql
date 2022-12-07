import { After, Before, Given, Then, When } from '@cucumber/cucumber';
import { agent } from './controller.steps';
import assert from 'assert';
import request from 'supertest';
import { otherUserPlayer, player } from './player.steps';
import { v4 } from 'uuid';
import { io as Client, Socket } from 'socket.io-client';
import * as faker from 'faker';
import { DirectChatsResponse } from '../../../../../../src/apps/CryptoWars/backend/Controllers/Communication/Chats/DirectChatsResponse';
import { sleep } from './army.steps';
import { DirectChatMessagesResponse } from '../../../../../../src/apps/CryptoWars/backend/Controllers/Communication/Chats/DirectChatMessagesResponse';

let _request: request.Test;
let _response: request.Response;
let clientSocket: Socket;
export const chatId = v4();
const messageId = v4();
const messageContent = faker.random.words();

Before({ tags: '@with-socket' }, async () => {
  clientSocket = Client(`http://localhost:5000`, { withCredentials: true });
  let a = true;
  clientSocket.on('connect', () => {
    console.log('======connected', clientSocket.id);
    a = false;
  });
  while (a) {
    // console.log(clientSocket.connected);
    await sleep(50);
  }
});

After({ tags: '@with-socket' }, () => {
  clientSocket.disconnect();
});

Given('I send a chats PUT request to {string} with body:', (route: string, body: string) => {
  const finalBody = body.replace(/:otherUserPlayerId/gi, otherUserPlayer.id);
  _request = agent.put(route).send(JSON.parse(finalBody));
});

Given('A chat was created', async () => {
  const route = `/direct-chats/${chatId}`;
  await agent.put(route).send({
    playerTwoId: otherUserPlayer.id
  });
});

Given('I open a direct chat', async () => {
  clientSocket.emit('socket.1.registerOnChat', {
    chatId
  });
});

Given('I send a message to the direct chat', async () => {
  let messageSaved = false;
  clientSocket.on('directChat.1.messageSent', msg => {
    if (msg.id === messageId) {
      messageSaved = true;
    }
  });

  clientSocket.emit('directChat.1.sendMessage', {
    id: messageId,
    message: messageContent,
    senderPlayerId: player.id,
    chatId
  });

  while (!messageSaved) {
    await sleep(50);
  }
});

When('I send a chats GET request to {string}', (route: string) => {
  const finalRoute = route.replace(/:chatId/gi, chatId);
  _request = agent.get(finalRoute).send();
});

Then('The chats response status code should be {int}', async (status: number) => {
  _response = await _request.expect(status);
});

Then('The chats response should be empty', () => {
  assert.deepStrictEqual(_response.body, {});
});

Then('The chats response content should be:', response => {
  console.log(_response.body);
  const chat = _response.body.chats[0];
  const expectedResponse: DirectChatsResponse = JSON.parse(
    response
      .replace(/:chatId/gi, chatId)
      .replace(/:playerId/gi, player.id)
      .replace(/:otherPlayerId/gi, otherUserPlayer.id)
      .replace(/:sameDate/gi, chat.createdAt)
  );
  const expectedChat = expectedResponse.chats[0];
  assert.deepStrictEqual(chat, expectedChat);
});

Then('The message response content should be:', response => {
  const message = _response.body.messages[0];
  const expectedResponse: DirectChatMessagesResponse = JSON.parse(
    response
      .replace(/:chatId/gi, chatId)
      .replace(/:playerId/gi, player.id)
      .replace(/:messageId/gi, messageId)
      .replace(/:sameDate/gi, message.createdAt)
      .replace(/:messageContent/gi, messageContent)
  );
  const expectedChat = expectedResponse.messages[0];
  assert.deepStrictEqual(message, expectedChat);
});
