import ErisClient from '../ErisClient';
import ErisMessage from '../interfaces/ErisMessage';

export default class Conversation {
  public messages: ErisMessage[] = [];
  public directives: string[] = [];
  public target: string | null = null; // Intended user
  public reference: ErisMessage;
  public eris: ErisClient;

  constructor(reference: ErisMessage) {
    this.reference = reference;
    this.eris = reference.eris;
  }

  public isWaitingForReply() {
    return (
      (this.directives[this.directives.length - 1] || '').toLowerCase() ===
      'also'
    );
  }

  public addMessage(message: ErisMessage) {
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

  public async executeDirectives() {
    const unfilteredAnswers = await Promise.all(
      this.directives.map(directive =>
        this.eris.directiveHandler
          .handleDirective(this, directive)
          .then(answer => this.eris.transformMessage(answer))
      )
    );
    // Remove undefined answers
    let answers = unfilteredAnswers.filter(Boolean) as string[];
    // Remove empty answers
    answers = answers.filter(answer => answer.trim());
    return await Promise.all(
      answers.map(answer => {
        // Split messages into chunks of 2000 characters or less
        const chunks = [];
        let chunk = '';
        for (const char of answer) {
          if (chunk.length + char.length > 1950) {
            chunks.push(chunk);
            chunk = '';
          }
          chunk += char;
        }
        if (chunk.length) chunks.push(chunk);
        return Promise.all(
          chunks.map((chunk, i) => {
            return this.reference.reply(
              chunks.length === 1
                ? chunk
                : `${i + 1}/${chunks.length}: ${chunk}`
            );
          })
        );
      })
    );
  }
}
