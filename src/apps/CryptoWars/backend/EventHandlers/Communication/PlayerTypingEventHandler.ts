import { EventHandler, EventHandlerResponse } from '../EventHandler';
import { getChatRoomFrom } from './SocketRooms';
import { ServerToClientEventsName } from '../../Events/events';
import { PlayerTypingEvent } from './PlayerTypingEvent';

export class PlayerTypingEventHandler implements EventHandler<PlayerTypingEvent> {
  constructor() {}

  async run(event: PlayerTypingEvent, res: EventHandlerResponse) {
    console.log(`${event.playerId} is typing`);
    res.socket
      .to(getChatRoomFrom(event.chatId))
      .emit(ServerToClientEventsName.playerIsTyping, event);
  }
}
