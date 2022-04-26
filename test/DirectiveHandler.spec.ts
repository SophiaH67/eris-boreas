/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
import DirectiveHandler, {
  findCommand,
} from '../src/conversation/DirectiveHandler';

describe('DirectiveHandler', () => {
  const mockEris = {
    commands: [
      {
        name: 'mock',
        aliases: ['mock'],
        description: 'mock command',
        usage: 'mock',
        run: jest.fn(async (conversation: any, args: string[]) => {
          return 'mock';
        }),
      },
    ],
  };
  //@ts-expect-error - eris is mocked
  const directiveHandler = new DirectiveHandler(mockEris);

  it('should find the command', () => {
    expect(findCommand(mockEris.commands, 'mock')).toEqual([
      mockEris.commands[0],
      'mock',
    ]);
  });

  it('should not find the command', () => {
    expect(findCommand(mockEris.commands, 'moc2')).toEqual([
      undefined,
      undefined,
    ]);
  });

  it('should handle a directive', async () => {
    const mockConversation = {};

    const result = await directiveHandler.handleDirective(
      //@ts-expect-error - conversation is mocked
      mockConversation,
      'mock'
    );
    expect(result).toBe('mock');
    expect(mockEris.commands[0].run).toHaveBeenCalledWith(mockConversation, []);
  });
});
