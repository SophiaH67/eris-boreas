/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
//@ts-ignore - TypeScript didn't like this way of importing
import ErisClient from '../src';

describe('ErisBot', () => {
  let erisClient: ErisClient;
  // Create a mock discord client
  const discordClient = {
    login: jest.fn(),
    on: jest.fn(),
    user: {
      id: '123',
    },
  };

  const redis = {
    connect: jest.fn(async () => {}),
    ping: jest.fn(async () => 'PONG'),
  };

  it('should create an instance', () => {
    erisClient = new ErisClient(discordClient);
    expect(erisClient).toBeTruthy();
    expect(discordClient.on).toHaveBeenCalled();
  });
  it('should have a discord client', () => {
    expect(erisClient.bot).toBeDefined();
    expect(erisClient.bot).toBe(discordClient);
  });

  it('should be able to login', () => {
    erisClient.bot.login();
    expect(discordClient.login).toHaveBeenCalled();
  });

  it('should have created a redis instance', () => {
    expect(erisClient.redis).toBeDefined();
    // For future tests, we'll need to mock the redis client
    erisClient.redis = redis;
  });

  it('should have a name', () => {
    expect(erisClient.name).toBe('Eris');
  });

  it('should not crash on onReady', () => {
    erisClient.onReady();
  });

  it('should not crash on onMessage', () => {
    const msg = {
      content: '',
    };
    erisClient.onMessage(msg);
  });

  it('should return early if bot id is author id', async () => {
    const msg = {
      author: {
        id: '123',
      },
    };
    const result = await erisClient.onMessage(msg);
    expect(result).toBeUndefined();
  });

  it("should call conversation.executeDirectives if it's not waiting for a reply", async () => {
    const conversation = {
      executeDirectives: jest.fn(async () => {}),
      isWaitingForReply: jest.fn(() => false),
    };
    const msg = {
      author: {
        id: '1',
      },
      content: 'Test Message',
      id: '1',
    };
    erisClient.conversationManager.addToOrNewConversation = jest.fn(
      () => conversation
    );
    await erisClient.onMessage(msg);
    expect(conversation.executeDirectives).toHaveBeenCalled();
  });
});
