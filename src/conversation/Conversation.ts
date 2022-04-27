import ErisClient from '../ErisClient';
import ErisMessage from '../interfaces/ErisMessage';

export default abstract class Conversation {
  public target: string | undefined; // Intended user
  public reference: ErisMessage | undefined;
  public eris: ErisClient;
  public directives: string[];
  public messages: ErisMessage[];

  constructor(eris: ErisClient) {
    this.eris = eris;

    this.directives = [];
    this.messages = [];
  }

  public abstract isWaitingForReply(): boolean;
  public get lastDirective(): string {
    return this.directives[this.directives.length - 1] || '';
  }

  public addMessage(message: ErisMessage) {
    if (this.lastDirective.toLowerCase() === 'also') this.directives.pop();

    this.messages.push(message);
    // Parse the message content for directives
    // Split on double newlines as basic message splitting
    const parts = message.content.split(/\n\n/g);
    if (!this.target) {
      // Check if first directive mentions someone
      const discordMentionRegex = /<@!*&*[0-9]+>/;
      const mentionDirective = parts[0].match(discordMentionRegex);
      if (mentionDirective) {
        this.target = mentionDirective[0].replace(/[<@!&>]/g, '');
        this.directives.push(parts[0].replace(discordMentionRegex, ''));
        parts.shift();
      }
    }
    // Add all other directives
    parts.forEach(part => {
      this.directives.push(part);
    });
    // Trim and remove empty directives
    this.directives = this.directives.map(directive => directive.trim());
    this.directives = this.directives.filter(Boolean);
  }

  public splitDirectivesToMessages(directives: string[]): string[] {
    const messages: string[] = [];
    let currentMessage = '';
    for (const directive of directives) {
      if (directive.length + currentMessage.length > 1950) {
        messages.push(currentMessage + '\n\nAlso');
        currentMessage = '';
      }
      currentMessage += `${directive}\n\n`;
    }
    messages.push(currentMessage);
    return messages.map(message => message.trim()).filter(Boolean);
  }
}
