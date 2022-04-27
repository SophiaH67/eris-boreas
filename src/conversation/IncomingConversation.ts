import ErisMessage from '../interfaces/ErisMessage';
import Conversation from './Conversation';

export default class IncomingConversation extends Conversation {
  public reference: ErisMessage;

  constructor(reference: ErisMessage) {
    super(reference.eris);
    this.reference = reference;
  }

  public isWaitingForReply() {
    return (
      (this.directives[this.directives.length - 1] || '').toLowerCase() ===
      'also'
    );
  }

  public async executeDirectives() {
    const unfilteredAnswers = await Promise.all(
      this.directives.map(directive =>
        this.eris.directiveHandler.handleDirective(this, directive)
      )
    );
    // Remove undefined answers
    let answers = unfilteredAnswers.filter(Boolean) as string[];
    // Remove empty answers
    answers = answers.filter(answer => answer.trim());
    return await Promise.all(
      answers.map(answer => this.reference.reply(answer))
    );
  }
}
