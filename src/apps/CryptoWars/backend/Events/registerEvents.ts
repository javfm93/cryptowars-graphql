import { PlayerTypingEventHandler } from '../EventHandlers/Communication/PlayerTypingEventHandler';
import { SocketEventHandlerResponse } from '../EventHandlers/SocketEventHandler';
import { ClientToServerEventsName, CommunicationServer } from './events';
import { logger } from '../../../../Contexts/Shared/Infrastructure/WinstonLogger';
import { SendDirectChatMessageEventHandler } from '../EventHandlers/Communication/SendDirectChatMessageEventHandler';
import { DependencyInjector } from '../dependency-injection/dependencyInjector';

export function registerEvents(server: CommunicationServer) {
  server.on('connection', socket => {
    const res: SocketEventHandlerResponse = { server, socket };
    logger.debug(`A user connected ${socket.id}, ${JSON.stringify(server.sockets.sockets.keys())}`);

    socket.on('disconnect', () => {
      logger.debug(`user disconnected', id: ${socket.id}`);
    });

    socket.on(ClientToServerEventsName.registerOnChat, async args => {
      await socket.join(`chat:${args.chatId}`);
    });

    const sendMessageEventHandler = DependencyInjector.get(SendDirectChatMessageEventHandler);
    socket.on(ClientToServerEventsName.sendChatMessage, command =>
      sendMessageEventHandler.run(command, res)
    );

    const typingEventHandler = DependencyInjector.get(PlayerTypingEventHandler);
    socket.on(ClientToServerEventsName.sendTyping, command => typingEventHandler.run(command, res));
  });
}
