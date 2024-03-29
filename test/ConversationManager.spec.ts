/* eslint-disable @typescript-eslint/require-await */
import ConversationManager from '../src/conversation/ConversationManager';
import ErisMessage from '../src/interfaces/ErisMessage';

describe('ConversationManager', () => {
  it('should be defined', () => {
    expect(ConversationManager).toBeDefined();
  });

  it('should return a new conversation', () => {
    const conversationManager = new ConversationManager();
    const mockMessage = {
      id: '1',
      content: '<@12345678> hi',
    };

    const conversation =
      //@ts-expect-error - this is a mock
      conversationManager.addToOrNewConversation(mockMessage);
    expect(conversation).toBeDefined();
    expect(conversation.directives.length).toBe(1);
    expect(conversation.directives[0]).toBe('hi');
    expect(conversation.target).toBe('12345678');
  });

  it('should add new messages with `also` directive', () => {
    const conversationManager = new ConversationManager();
    const mockMessage1 = {
      id: '1',
      content: '<@12345678> hi\n\nAlso',
    };
    const mockMessage2 = {
      id: '2',
      reference: {
        messageId: '1',
      },
      content: "What's up?",
    };

    //@ts-expect-error - this is a mock
    let conversation = conversationManager.addToOrNewConversation(mockMessage1);
    expect(conversation.directives[1]).toBe('Also');

    //@ts-expect-error - this is a mock
    conversation = conversationManager.addToOrNewConversation(mockMessage2);
    expect(conversation.directives[1]).toBe("What's up?");
  });

  it('should not add new messages if there is no `also` directive', () => {
    const conversationManager = new ConversationManager();
    const mockMessage1 = {
      id: '1',
      content: '<@12345678> hi',
    };
    const mockMessage2 = {
      id: '2',
      reference: {
        messageId: '1',
      },
      content: "What's up?",
    };

    const conversation1 =
      //@ts-expect-error - this is a mock
      conversationManager.addToOrNewConversation(mockMessage1);

    const conversation2 =
      //@ts-expect-error - this is a mock
      conversationManager.addToOrNewConversation(mockMessage2);

    // They must not be the same conversation
    expect(conversation1).not.toBe(conversation2);
  });

  it('should be able to execute a conversation', async () => {
    const conversationManager = new ConversationManager();
    const mockMessage1: ErisMessage = {
      id: '1',
      content: "What's the weather like?",
      eris: {
        //@ts-expect-error - this is a mock
        directiveHandler: {
          handleDirective: jest.fn(() => Promise.resolve('It is sunny')),
        },
        bot: {
          //@ts-expect-error - this is a mock
          user: {
            id: '12345678',
          },
        },
        transformMessage: jest.fn(async (msg: string) => msg),
      },
      //@ts-expect-error - this is a mock
      author: {
        id: '12345678',
      },
      reply: jest.fn((msg: string) => Promise.resolve(mockMessage1)),
    };

    const conversation =
      conversationManager.addToOrNewConversation(mockMessage1);
    await conversation.executeDirectives(); // This isn't really testing it, but it'll make jest happy
    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockMessage1.reply).toHaveBeenCalledWith('It is sunny');
  });
});
