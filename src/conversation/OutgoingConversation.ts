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

    // Join directives with \n\n, splitting every 1900 characters, and adding an `Also` directive if needed
    const messages: string[] = [];
    let currentMessage = this.target ? `<@!${this.target}> ` : '';
    for (const directive of directives) {
      if (currentMessage.length + directive.length > 1900) {
        messages.push(`${currentMessage}\n\nAlso`);
        currentMessage = '';
      }
      currentMessage += `${directive}\n\n`;
    }
    messages.push(currentMessage);

    // Send each message one by one, all replying to the first one
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    (async () => {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const reference = await channel.send(messages.shift()!);
      this.eris.conversationManager.conversations[reference.id] = this;
      (reference as ErisMessage).eris = this.eris;
      this.reference = reference as ErisMessage;

      for (const message of messages) {
        await this.reference.reply(message);
      }
    })();
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
