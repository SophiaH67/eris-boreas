import { DMChannel, TextChannel } from 'discord.js';
import ErisClient from '../ErisClient';
import ErisMessage from '../interfaces/ErisMessage';
import Conversation from './Conversation';

export default class OutgoingConversation extends Conversation {
  public callbacks: ((conversation: OutgoingConversation) => void)[] = [];

  constructor(
    eris: ErisClient,
    directives: string[],
    channel: DMChannel | TextChannel,
    target?: string
  ) {
    super(eris);
    this.target = target;

    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.replyWithDirectives(directives, channel);
  }

  isWaitingForReply() {
    // Either the last directive is 'Also', or there are no directives yet
    if (this.directives.length === 0) return true; // No directives/answers
    if (this.lastDirective.toLowerCase() == 'also') return true;
    return false;
  }

  addMessage(message: ErisMessage) {
    super.addMessage(message);
    if (this.lastDirective.toLowerCase() == 'also') return;
    this.callbacks.forEach(callback => callback(this));
  }
}
