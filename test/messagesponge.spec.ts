/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
//@ts-ignore - TypeScript didn't like this way of importing
import { ErisClient } from '../src';

jest.mock('redis', () => jest.requireActual('redis-mock'));

describe('MessageSponge', () => {
  let erisClient: ErisClient;
  it('should create an instance', () => {
    erisClient = new ErisClient({
      on: jest.fn(),
    });
    expect(erisClient.sponge).toBeTruthy();
  });

  it('should unchunk messages', () => {
    const msg = {
      content: 'Test message\nAlso',
      id: 'msg1',
      reference: {
        messageId: undefined,
      },
      author: {
        id: '12345',
      },
    };
    const msg2 = {
      content: 'Finished',
      id: 'msg2',
      reference: {
        messageId: 'msg1',
      },
      author: {
        id: '12345',
      },
    };
    let conversation = erisClient.sponge.onMessage(msg);
    expect(conversation).toBeFalsy();
    conversation = erisClient.sponge.onMessage(msg2);
    expect(conversation).toBeTruthy();
    expect(conversation.messages.length).toBe(2);
    expect(conversation.messages[0].content).toBe('Test message\n');
    expect(conversation.messages[1].content).toBe('Finished');
  });

  it('should not create a conversation if the message is not relevant', () => {
    const msg = {
      content: 'Test message',
      id: 'msg1',
      reference: {
        messageId: undefined,
      },
    };

    const conversation = erisClient.sponge.onMessage(msg);
    expect(conversation).toBeFalsy();
  });
});
