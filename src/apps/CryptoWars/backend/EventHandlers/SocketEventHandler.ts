import { CommunicationServer, CommunicationSocket } from '../Events/events';
import { Class } from '../../../../Contexts/Shared/Domain/Primitives';
import { ComponentTags, DependencyInjector } from '../dependency-injection/dependencyInjector';

export interface SocketEventHandlerResponse {
  server: CommunicationServer;
  socket: CommunicationSocket;
}

export abstract class SocketEventHandler<Event> {
  abstract run(event: Event, res: SocketEventHandlerResponse): Promise<void>;
}

export const RegisterSocketEventHandler =
  () =>
  (target: Class<any>): Class<any> => {
    DependencyInjector.registerAndUse(target).addTag(ComponentTags.socketEventHandler);
    return target;
  };
