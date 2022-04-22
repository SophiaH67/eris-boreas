import CommandException from '../src/classes/commands/CommandException';

describe('CommandException', () => {
  it('should work', () => {
    const commandException = new CommandException();
    expect(commandException.message).toBe('Command not found');
  });
});
