import Command from '../src/classes/commands/Command';
import CommandContext from '../src/classes/commands/CommandContext';
import Directive from '../src/classes/Directive';

// Test an abstract class
describe('Command', () => {
  it('should work', () => {
    class TestCommand extends Command {
      public aliases = ['test'];
      public description = 'Test command';
      public usage = '';

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      public execute = jest.fn((ctx: CommandContext) =>
        Promise.resolve('test')
      );
    }
    const testCommand = new TestCommand();
    expect(testCommand.aliases).toEqual(['test']);
    expect(testCommand.description).toBe('Test command');
    expect(testCommand.usage).toBe('');

    const commandContext = new CommandContext(
      new Directive('test'),
      //@ts-ignore - Mocked context
      {
        commands: [testCommand],
      },
      {}
    );
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    expect(testCommand.execute(commandContext)).resolves.toBe('test');
  });
});
