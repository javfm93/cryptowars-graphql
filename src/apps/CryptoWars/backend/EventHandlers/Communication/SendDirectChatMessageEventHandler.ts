import { CommandBus } from '../../../../../Contexts/Shared/Domain/CommandBus';
import { SendChatMessageCommand } from '../../../../../Contexts/Communication/ChatMessages/Application/Send/SendChatMessageCommand';
import {
  RegisterSocketEventHandler,
  SocketEventHandler,
  SocketEventHandlerResponse
} from '../SocketEventHandler';
import { ServerToClientEventsName } from '../../Events/events';
import { SendDirectChatMessageEvent } from './SendDirectChatMessageEvent';
import { getChatRoomFrom } from './SocketRooms';

@RegisterSocketEventHandler()
export class SendDirectChatMessageEventHandler
  implements SocketEventHandler<SendDirectChatMessageEvent>
{
  constructor(private commandBus: CommandBus) {}

  async run(event: SendDirectChatMessageEvent, res: SocketEventHandlerResponse) {
    const sendMessageCommand = new SendChatMessageCommand(
      event.id,
      event.message,
      event.senderPlayerId,
      event.chatId
    );

    // we are not getting the correct room for the player
    const result = await this.commandBus.dispatch(sendMessageCommand);
    if (result.isFailure()) return console.log(result.value);
    res.server
      .to(getChatRoomFrom(event.chatId))
      .emit(ServerToClientEventsName.chatMessageSent, event);
  }
}
