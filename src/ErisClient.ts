import { Client, Message } from 'discord.js';
import { createClient } from 'redis';
import MessageLexer from './classes/MessageLexer';

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

  async onMessage(msg: Message) {
    console.log(`${this.name} received message: ${msg.content}`);
    const lexer = new MessageLexer(msg.content);
    const directives = await lexer.lex();
    directives;
  }
}
