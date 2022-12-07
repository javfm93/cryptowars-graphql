import { useEffect, useState } from 'react';
import { v4 } from 'uuid';
import { useSocket } from './useSocket';
import {
  ClientToServerEventsName,
  ServerToClientEventsName
} from '../../../../backend/Events/events';
import { ChatMessage } from '../../../../../../Contexts/Communication/ChatMessages/Domain/ChatMessage';
import { Primitives } from '../../../../../../Contexts/Shared/Domain/Primitives';
import { SendDirectChatMessageEvent } from '../../../../backend/EventHandlers/Communication/SendDirectChatMessageEvent';

export const useSendChatMessage = (
  chatId?: string,
  playerId?: string,
  initialMessages?: Array<Primitives<ChatMessage>>
) => {
  const { socket } = useSocket();
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<Array<SendDirectChatMessageEvent>>();
  const [playerIsTypingText, setPlayerIsTypingText] = useState<string>('');

  useEffect(() => {
    if (initialMessages)
      setMessages(
        initialMessages?.map(m => ({
          id: m.id,
          message: m.messageContent,
          senderPlayerId: m.senderPlayerId,
          chatId: m.chatId
        }))
      );
  }, [initialMessages]);

  useEffect(() => {
    if (!playerId) return;
    if (!chatId) return;

    console.log('registering', chatId);

    socket.emit(ClientToServerEventsName.registerOnChat, {
      chatId
    });

    socket.on(ServerToClientEventsName.chatMessageSent, msg => {
      console.log('received', msg);
      setMessages(mges => (mges ? [...mges, msg] : [msg]));
    });

    socket.on(ServerToClientEventsName.playerIsTyping, playerIsTyping => {
      playerIsTyping.typing
        ? setPlayerIsTypingText(`Player: ${playerIsTyping.playerId} is typing`)
        : setPlayerIsTypingText('');
    });

    return () => {
      socket.off(ServerToClientEventsName.chatMessageSent);
      socket.off(ServerToClientEventsName.playerIsTyping);
    };
  }, [playerId, chatId]);

  const sendMessage = () => {
    console.log('sending message', message);
    socket.emit(ClientToServerEventsName.sendChatMessage, {
      id: v4(),
      message,
      senderPlayerId: playerId!,
      chatId: chatId!
    });
  };

  return {
    sendMessage,
    setMessage: (m: string) => {
      socket.emit(ClientToServerEventsName.sendTyping, {
        typing: !!m,
        playerId: playerId!,
        chatId: chatId!
      });
      setMessage(m);
    },
    playerIsTypingText,
    messages
  };
};
