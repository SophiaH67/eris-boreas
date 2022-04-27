/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Command from '../src/conversation/Command';
import IncomingConversation from '../src/conversation/IncomingConversation';

describe('Command', () => {
  // Command is an abstract class, so we can't instantiate it
  // Instead, we'll use a mock class
  class MockCommand extends Command {
    public aliases = ['mock'];
    public description = 'mock command';
    public usage = 'mock';

    public run = jest.fn(
      async (conversation: IncomingConversation, args: string[]) => {
        return 'mock';
      }
    );
  }

  const mockCommand = new MockCommand();

  it('should have aliases', () => {
    expect(mockCommand.aliases).toBeDefined();
    expect(mockCommand.aliases).toEqual(['mock']);
  });

  it('should have a description', () => {
    expect(mockCommand.description).toBeDefined();
    expect(mockCommand.description).toEqual('mock command');
  });

  it('should have a usage', () => {
    expect(mockCommand.usage).toBeDefined();
    expect(mockCommand.usage).toEqual('mock');
  });
});
