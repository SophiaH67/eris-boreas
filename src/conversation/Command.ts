import IncomingConversation from './IncomingConversation';

export default abstract class Command {
  public abstract aliases: string[];
  public abstract description: string;
  public abstract usage: string;

  public abstract run(
    conversation: IncomingConversation,
    args: string[]
  ): Promise<string | undefined>;
}
