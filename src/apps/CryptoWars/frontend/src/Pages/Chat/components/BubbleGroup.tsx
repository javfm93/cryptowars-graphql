import * as React from 'react';

import DefaultChatBubble from './ChatBubble';
import Message from '../Message';

const styles = {
  chatbubbleWrapper: {
    marginTop: 10,
    marginBottom: 10,
    overflow: 'auto',
    position: 'relative'
  },
  bubbleGroupHeader: {
    margin: 0,
    fontSize: 14,
    fontWeight: '400',
    color: '#999'
  }
};

interface BubbleGroupInterface {
  messages: [Message];
  id: number;
  showSenderName: boolean;
  chatBubble: DefaultChatBubble;
}

export default class BubbleGroup extends React.Component {
  props;

  constructor(props: BubbleGroupInterface) {
    super(props);
  }

  renderGroup(messages: [Message], id: number) {
    const { bubblesCentered, bubbleStyles, showSenderName, chatBubble, senderName } = this.props;
    const ChatBubble = chatBubble || DefaultChatBubble;
    const sampleMessage = messages[0];

    const messageNodes = messages.map((message, i) => {
      return (
        <ChatBubble
          key={i}
          message={message}
          bubblesCentered={bubblesCentered}
          bubbleStyles={bubbleStyles}
        />
      );
    });

    return (
      <div style={styles.chatbubbleWrapper}>
        {showSenderName &&
          (senderName || sampleMessage.senderName) !== '' &&
          sampleMessage.id !== 0 && (
            <h5 style={styles.bubbleGroupHeader}>{senderName || sampleMessage.senderName}</h5>
          )}
        {messageNodes}
      </div>
    );
  }

  render() {
    const { messages, id } = this.props;
    return this.renderGroup(messages, id);
  }
}
