import { DMChannel, TextChannel } from 'discord.js';
import ErisClient from '../ErisClient';
import ErisMessage from '../interfaces/ErisMessage';
import Conversation from './Conversation';
import IncomingConversation from './IncomingConversation';
import OutgoingConversation from './OutgoingConversation';

export default class ConversationManager {
  public conversations: { [key: string]: Conversation | undefined } = {};

  public addToOrNewConversation(message: ErisMessage): Conversation {
    const conversation = this.getOrCreateConversation(message);
    conversation.addMessage(message);
    return conversation;
  }

  public getOrCreateConversation(message: ErisMessage): Conversation {
    const conversation = this.conversations[message.reference?.messageId || ''];
    if (conversation && conversation.isWaitingForReply()) {
      return conversation;
    }
    return (this.conversations[message.id] = new IncomingConversation(message));
  }

  public askOtherBot(
    eris: ErisClient,
    directives: string[],
    channel: DMChannel | TextChannel,
    target?: string
  ): Promise<string[]> {
    const conversation = new OutgoingConversation(
      eris,
      directives,
      channel,
      target
    );
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    return new Promise<string[]>((resolve, _reject) => {
      conversation.callbacks.push(conversation =>
        resolve(conversation.directives)
      );
    });
  }
}
