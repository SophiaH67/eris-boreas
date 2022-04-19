/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
//@ts-ignore - TypeScript didn't like this way of importing
import { ErisClient } from '../src';

describe('ErisBot', () => {
  let erisClient: ErisClient;
  // Create a mock discord client
  const discordClient = {
    login: jest.fn(),
    on: jest.fn(),
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
});
