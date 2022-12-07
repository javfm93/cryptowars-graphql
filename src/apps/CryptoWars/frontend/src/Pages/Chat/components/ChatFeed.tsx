import { useEffect, useState } from 'react';
import BubbleGroup from './BubbleGroup';
import ChatBubble from './ChatBubble';
import Message from '../Message';

const styles = {
  chatPanel: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    overflow: 'hidden'
  },
  chatHistory: { overflow: 'auto' },
  chatbubbleWrapper: {
    marginTop: 10,
    marginBottom: 10,
    overflow: 'auto',
    position: 'relative'
  },
  img: {
    borderRadius: 100,
    bottom: 0,
    left: 0,
    position: 'absolute',
    width: 36,
    zIndex: 100
  }
};

interface ChatFeedInterface {
  bubblesCentered?: boolean;
  bubbleStyles?: object;
  hasInputField?: boolean;
  isTyping?: string;
  maxHeight?: number;
  messages: any;
  showSenderName?: boolean;
  chatBubble?: React.Component;
}

export const ChatFeed = (props: ChatFeedInterface) => {
  const [chat, setChat] = useState<HTMLDivElement | null>(null);
  const scrollToBottom = () => {
    console.log(chat);
    if (chat) {
      console.log('scrolling');
      const scrollHeight = chat.scrollHeight;
      const height = chat.clientHeight;
      const maxScrollTop = scrollHeight - height;
      chat.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
    }
  };

  useEffect(scrollToBottom, [chat, props.messages.length]);

  const renderMessages = (messages: [Message]) => {
    const { isTyping, bubbleStyles, showSenderName } = props;

    let group: Array<Message> = [];

    const messageNodes = messages.map((message, index) => {
      group.push(message);
      if (index === messages.length - 1 || messages[index + 1].id !== message.id) {
        const messageGroup = group;
        group = [];
        return (
          <BubbleGroup
            key={index}
            messages={messageGroup}
            id={message.id}
            showSenderName={showSenderName}
            chatBubble={ChatBubble}
            bubbleStyles={bubbleStyles}
          />
        );
      }

      return null;
    });

    if (isTyping) {
      messageNodes.push(
        <div key="isTyping" style={styles.chatbubbleWrapper}>
          <ChatBubble
            message={new Message({ id: 1, message: isTyping, senderName: '' })}
            bubbleStyles={bubbleStyles}
          />
        </div>
      );
    }

    return messageNodes;
  };

  return (
    <div id="chat-panel" style={styles.chatPanel}>
      <div
        ref={c => {
          setChat(c);
        }}
        className="chat-history"
        style={{ ...styles.chatHistory, maxHeight: props.maxHeight }}
      >
        <div className="chat-messages">{renderMessages(props.messages)}</div>
      </div>
    </div>
  );
};
