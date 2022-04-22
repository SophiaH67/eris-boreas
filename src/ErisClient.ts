/* eslint-disable @typescript-eslint/require-await */
import { Client, Message } from 'discord.js';
import { createClient } from 'redis';
import type Command from './classes/commands/Command';
import MessageLexer from './classes/MessageLexer';

export default class ErisClient {
  public bot: Client;
  public commands: Command[] = [];
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

  async onMessage(msg: Message) {
    console.log(`${this.name} received message: ${msg.content}`);
    const lexer = new MessageLexer(msg.content);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const directives = lexer.directives;
  }
}
