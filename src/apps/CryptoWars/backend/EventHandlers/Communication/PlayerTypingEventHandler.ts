import {
  RegisterSocketEventHandler,
  SocketEventHandler,
  SocketEventHandlerResponse
} from '../SocketEventHandler';
import { getChatRoomFrom } from './SocketRooms';
import { ServerToClientEventsName } from '../../Events/events';
import { PlayerTypingEvent } from './PlayerTypingEvent';

@RegisterSocketEventHandler()
export class PlayerTypingEventHandler implements SocketEventHandler<PlayerTypingEvent> {
  constructor() {}

  async run(event: PlayerTypingEvent, res: SocketEventHandlerResponse) {
    console.log(`${event.playerId} is typing`);
    res.socket
      .to(getChatRoomFrom(event.chatId))
      .emit(ServerToClientEventsName.playerIsTyping, event);
  }
}
