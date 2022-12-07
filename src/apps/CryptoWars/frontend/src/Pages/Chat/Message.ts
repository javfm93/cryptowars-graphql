interface MessageData {
  id: number | string;
  message: string;
  senderName?: string;
}

export default class Message {
  id: number | string;
  message: string;
  senderName?: string;

  constructor(messageData: MessageData) {
    this.id = messageData.id;
    this.message = messageData.message;
    this.senderName = messageData.senderName || undefined;
  }
}
