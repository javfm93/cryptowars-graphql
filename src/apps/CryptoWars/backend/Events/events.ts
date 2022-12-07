import { Server, Socket } from 'socket.io';
import { SendDirectChatMessageEvent } from '../EventHandlers/Communication/SendDirectChatMessageEvent';
import { PlayerTypingEvent } from '../EventHandlers/Communication/PlayerTypingEvent';

export enum ServerToClientEventsName {
  chatMessageSent = 'directChat.1.messageSent',
  playerIsTyping = 'directChat.1.playerIsTyping'
}

export enum ClientToServerEventsName {
  registerOnChat = 'socket.1.registerOnChat',
  sendChatMessage = 'directChat.1.sendMessage',
  sendTyping = 'directChat.1.typing'
}

export interface ServerToClientEvents {
  [ServerToClientEventsName.chatMessageSent](command: SendDirectChatMessageEvent): void;

  [ServerToClientEventsName.playerIsTyping](command: PlayerTypingEvent): void;
}

export interface ClientToServerEvents {
  [ClientToServerEventsName.registerOnChat](command: { chatId: string }): void;

  [ClientToServerEventsName.sendChatMessage](command: SendDirectChatMessageEvent): void;

  [ClientToServerEventsName.sendTyping](command: PlayerTypingEvent): void;
}

export type CommunicationServer = Server<ClientToServerEvents, ServerToClientEvents>;
export type CommunicationSocket = Socket<ClientToServerEvents, ServerToClientEvents>;
