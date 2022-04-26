import { Message } from 'discord.js';

export default class Conversation {
  public messages: Message[] = [];
  public directives: string[] = [];
  public target = ''; // Intended user
  public reference: Message;

  constructor(reference: Message) {
    this.reference = reference;
  }

  public isWaitingForReply() {
    return (
      (this.directives[this.directives.length - 1] || '').toLowerCase() ===
      'also'
    );
  }

  public addMessage(message: Message) {
    if (this.isWaitingForReply()) this.directives.pop(); // Remove 'Also' directive

    this.messages.push(message);
    // Parse the message content for directives
    // Split on double newlines as basic message splitting
    const parts = message.content.split(/\n\n/g);
    // Check if first directive mentions someone
    const discordMentionRegex = /<@!*&*[0-9]+>/;
    const mentionDirective = parts[0].match(discordMentionRegex);
    if (mentionDirective) {
      this.target = mentionDirective[0].replace(/[<@!&>]/g, '');
      this.directives.push(parts[0].replace(discordMentionRegex, ''));
      parts.shift();
    }
    // Add all other directives
    parts.forEach(part => {
      this.directives.push(part);
    });
    // Trim and remove empty directives
    this.directives = this.directives.map(directive => directive.trim());
    this.directives = this.directives.filter(Boolean);
  }

  public executeDirectives() {
    this.directives.forEach(directive => {
      // @TODO: Implement directive execution
      console.log(`Executing directive: ${directive}`);
    });
  }
}
