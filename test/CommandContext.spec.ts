import CommandContext from '../src/classes/commands/CommandContext';
import Directive from '../src/classes/Directive';

describe('CommandContext', () => {
  let bot = {
    commands: [
      {
        aliases: ['test'],
      },
    ],
  };
  it('should work', () => {
    const directive = new Directive('test string with spaces');
    //@ts-ignore - Mocked bot
    const commandContext = new CommandContext(directive, bot, {});
    expect(commandContext.directive).toBe(directive);
    expect(commandContext.bot).toBe(bot);
    expect(commandContext.command).toBe(bot.commands[0]);
    expect(commandContext.args).toEqual(['string', 'with', 'spaces']);
  });
});
