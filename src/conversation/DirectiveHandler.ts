import ErisClient from '../ErisClient';
import Conversation from './Conversation';

export default class DirectiveHandler {
  constructor(public eris: ErisClient) {}
  // eslint-disable-next-line @typescript-eslint/require-await
  public async handleDirective(
    conversation: Conversation,
    directive: string
  ): Promise<string | undefined> {
    console.log(
      `${conversation.reference.id} handling directive: ${directive}`
    );
    return `Handled "${directive}"`;
  }
}
