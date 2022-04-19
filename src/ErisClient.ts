import { Client, Message } from 'discord.js';
import { createClient } from 'redis';
import Middleware from './types/Middleware';

export default class ErisClient {
  public middleware: Middleware[] = [];
  public redis = createClient();

  constructor(public bot: Client) {
    this.bot.on('ready', () => this.onReady());
    this.bot.on('messageCreate', msg => this.onMessage(msg));
  }

  get name() {
    return 'Eris';
  }

  async onReady() {
    await this.redis.connect();
    const ping = await this.redis.ping();
    console.log(`${this.name} is ready!, database ping: ${ping}`);
  }

  onMessage(msg: Message) {
    console.log(`${this.name} received message: ${msg.content}`);
  }
}
