import container from '../dependency-injection';
import { PlayerTypingEventHandler } from '../EventHandlers/Communication/PlayerTypingEventHandler';
import { EventHandlerResponse } from '../EventHandlers/EventHandler';
import { ClientToServerEventsName, CommunicationServer } from './events';
import { logger } from '../../../../Contexts/Shared/Infrastructure/WinstonLogger';
import { SendDirectChatMessageEventHandler } from '../EventHandlers/Communication/SendDirectChatMessageEventHandler';

export function registerEvents(server: CommunicationServer) {
  server.on('connection', socket => {
    const res: EventHandlerResponse = { server, socket };
    logger.debug(`A user connected ${socket.id}, ${JSON.stringify(server.sockets.sockets.keys())}`);

    socket.on('disconnect', () => {
      logger.debug(`user disconnected', id: ${socket.id}`);
    });

    socket.on(ClientToServerEventsName.registerOnChat, async args => {
      await socket.join(`chat:${args.chatId}`);
    });

    const sendMessageEventHandler: SendDirectChatMessageEventHandler = container.get(
      'Apps.Communication.Backend.EventHandlers.SendDirectChatMessageEventHandler'
    );
    socket.on(ClientToServerEventsName.sendChatMessage, command =>
      sendMessageEventHandler.run(command, res)
    );

    const typingEventHandler: PlayerTypingEventHandler = container.get(
      'Apps.Communication.Backend.EventHandlers.PlayerTypingEventHandler'
    );
    socket.on(ClientToServerEventsName.sendTyping, command => typingEventHandler.run(command, res));
  });
}
