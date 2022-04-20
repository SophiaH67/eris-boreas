import { Client, Message } from 'discord.js';
import { createClient } from 'redis';

export default class ErisClient {
  bot: Client;
  public redis = createClient();
  constructor(discordClient: Client) {
    this.bot = discordClient;

    this.bot.on('ready', () => this.onReady());
    this.bot.on('messageCreate', msg => this.onMessage(msg));
  }

  get name() {
    return 'Eris';
  }

  async onReady() {
    console.error(this.redis);
    await this.redis.connect();
    const ping = await this.redis.ping();
    console.log(`${this.name} is ready!, database ping: ${ping}`);
  }

  onMessage(msg: Message) {
    console.log(`${this.name} received message: ${msg.content}`);
  }
}
