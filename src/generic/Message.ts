/* eslint-disable no-prototype-builtins */
import { Message as DMessage } from 'discord.js';
import Channel from '../types/Channel';
import ErisClient from '../ErisClient';

export default class Message {
  public content: string;
  public channel: Channel;

  constructor(msg: DMessage, public client: ErisClient) {
    this.content = msg.content;
    this.channel = msg.channel;
  }

  async reply(content: string): Promise<void> {
    //@TODO: Deal with message splitting
    await this.channel.send(content);
    return;
  }
}
