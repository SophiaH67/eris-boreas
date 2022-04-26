import { Message } from 'discord.js';
import Conversation from './Conversation';

export default class ConversationManager {
  public conversations: { [key: string]: Conversation } = {};

  public addToOrNewConversation(message: Message): Conversation {
    const conversation = this.getOrCreateConversation(message);
    conversation.addMessage(message);
    return conversation;
  }

  public getOrCreateConversation(message: Message): Conversation {
    const conversation = this.conversations[message.reference?.messageId || ''];
    if (conversation && conversation.isWaitingForReply()) {
      return conversation;
    }
    return (this.conversations[message.id] = new Conversation(message));
  }
}
