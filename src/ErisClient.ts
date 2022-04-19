import { Client, Message } from 'discord.js';
import { createClient } from 'redis';
import MessageSponge from './classes/MessageSponge';

export default class ErisClient {
  bot: Client;
  sponge: MessageSponge;
  public redis = createClient();
  constructor(discordClient: Client) {
    this.bot = discordClient;
    this.sponge = new MessageSponge(this);

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
    /* Unchunk the message */
    const conversation = this.sponge.onMessage(msg);
    if (!conversation) return;
    /* Handle the message */
  }
}
