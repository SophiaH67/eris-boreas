import CommandContext from './CommandContext';

export default abstract class Command {
  public abstract aliases: string[];
  public abstract description: string;
  public abstract usage: string;

  public abstract execute(ctx: CommandContext): Promise<string>;
}
