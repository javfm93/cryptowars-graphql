import { CommunicationServer, CommunicationSocket } from '../Events/events';

export interface EventHandlerResponse {
  server: CommunicationServer;
  socket: CommunicationSocket;
}

export abstract class EventHandler<Event> {
  abstract run(event: Event, res: EventHandlerResponse): Promise<void>;
}
