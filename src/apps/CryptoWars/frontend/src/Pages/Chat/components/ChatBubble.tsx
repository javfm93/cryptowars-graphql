import * as React from 'react';
import Message from '../Message';

export interface ChatBubbleProps {
  message: Message;
  bubbleStyles: {
    userBubble: object;
    chatbubble: object;
    text: object;
  };
  bubblesCentered: boolean;
}

const styles = {
  chatbubbleWrapper: {
    overflow: 'auto'
  },
  chatbubble: {
    backgroundColor: '#0084FF',
    borderRadius: 20,
    marginTop: 1,
    marginRight: 'auto',
    marginBottom: 1,
    marginLeft: 'auto',
    maxWidth: 425,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 14,
    paddingRight: 14,
    width: '-webkit-fit-content'
  },
  chatbubbleOrientationNormal: {
    float: 'right'
  },
  recipientChatbubble: {
    backgroundColor: '#ccc'
  },
  recipientChatbubbleOrientationNormal: {
    float: 'left'
  },
  p: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '300',
    margin: 0
  }
};
const defaultBubbleStyles = {
  userBubble: {},
  chatbubble: {},
  text: {}
};

export default class ChatBubble extends React.Component {
  props;

  constructor(props: ChatBubbleProps) {
    super(props);
  }

  public render() {
    const { bubblesCentered } = this.props;
    let { bubbleStyles } = this.props;
    bubbleStyles = bubbleStyles || defaultBubbleStyles;
    const { userBubble, chatbubble, text } = bubbleStyles;

    // message.id 0 is reserved for blue
    const chatBubbleStyles =
      this.props.message.id === 0
        ? {
            ...styles.chatbubble,
            ...(bubblesCentered ? {} : styles.chatbubbleOrientationNormal),
            ...chatbubble,
            ...userBubble
          }
        : {
            ...styles.chatbubble,
            ...styles.recipientChatbubble,
            ...(bubblesCentered ? {} : styles.recipientChatbubbleOrientationNormal),
            ...userBubble,
            ...chatbubble
          };

    return (
      <div
        style={{
          ...styles.chatbubbleWrapper
        }}
      >
        <div style={chatBubbleStyles}>
          <p style={{ ...styles.p, ...text }}>{this.props.message.message}</p>
        </div>
      </div>
    );
  }
}
