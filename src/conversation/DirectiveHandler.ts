import ErisClient from '../ErisClient';
import Conversation from './Conversation';
import Command from './Command';

export function findCommand(
  commands: Command[],
  directive: string
): [Command, string] | [undefined, undefined] {
  // Look for a command where one of the aliases is the start of the directive
  for (const command of commands) {
    for (const alias of command.aliases) {
      if (directive.startsWith(alias)) {
        return [command, alias];
      }
    }
  }
  return [undefined, undefined];
}

export default class DirectiveHandler {
  constructor(public eris: ErisClient) {}
  // eslint-disable-next-line @typescript-eslint/require-await
  public async handleDirective(
    conversation: Conversation,
    directive: string
  ): Promise<string | undefined> {
    const [command, alias] = findCommand(this.eris.commands, directive);
    if (!command || !alias) return; // No command found

    const args =
      directive
        .substring(alias.length)
        .trim()
        .match(/[^\s"']+|"([^"]*)"|'([^']*)'/g) ?? [];
    args.unshift(alias);

    try {
      return await command.run(conversation, args);
    } catch (e) {
      return `there was a problem: ${
        e instanceof Error ? e.message : (e as string)
      }`;
    }
  }
}
