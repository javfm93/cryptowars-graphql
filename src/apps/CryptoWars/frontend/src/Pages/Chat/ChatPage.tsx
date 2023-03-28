import { Layout } from '../Shared/Layout';
import { Button, Grid } from '@mui/material';
import { useChatPagePlayer } from './useChatPagePlayer';
import React, { useState } from 'react';
import { ChatFeed } from './components/ChatFeed';
import Message from './Message';
import ChatInput from './components/ChatInput';
import { useSendChatMessage } from './useSendChatMessage';
import { useDirectChats } from './useDirectChats';
import { useDirectChatMessages } from './useDirectChatMessages';

export const ChatPage = () => {
  const { result: playerResult, isLoading, error } = useChatPagePlayer();
  const [connectedChat, setConnectedChat] = useState<string>();
  const chatsResult = useDirectChats();
  const initialMessagesResult = useDirectChatMessages(connectedChat);
  const { sendMessage, setMessage, playerIsTypingText, messages } = useSendChatMessage(
    connectedChat,
    playerResult?.id,
    initialMessagesResult?.result?.messages
  );

  if (!chatsResult.result) return 'Loading chats';
  const chats = chatsResult.result.chats;
  const messagesToShow = messages
    ? messages.map(
        message =>
          new Message({
            id: message.senderPlayerId === playerResult?.id ? 0 : 1,
            message: message.message,
            senderName: message.senderPlayerId
          })
      )
    : [];
  return (
    <Layout tittle={'Chat'} isLoading={isLoading} error={error}>
      <Grid container item justifyContent={'center'} textAlign={'center'}>
        <Grid item xs={3}>
          {chats.map(chat => {
            return (
              <div key={chat.id}>
                <h4> {chat.id}</h4>
                <Button
                  onClick={() => {
                    setConnectedChat(chat.id);
                  }}
                >
                  Connect
                </Button>
              </div>
            );
          })}
        </Grid>
        <Grid item xs={9}>
          {connectedChat ? (
            <>
              <ChatFeed messages={messagesToShow} maxHeight={500} isTyping={playerIsTypingText} />
              <ChatInput
                setMessage={setMessage}
                sendMessage={sendMessage}
                inputPlaceholder={'Type a message...'}
              />
            </>
          ) : null}
        </Grid>
      </Grid>
    </Layout>
  );
};
