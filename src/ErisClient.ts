import { Client, Message } from 'discord.js';

export default class ErisClient {
  bot: Client;
  constructor(discordClient: Client) {
    this.bot = discordClient;
    this.bot.on('ready', () => this.onReady());
    this.bot.on('messageCreate', msg => this.onMessage(msg));
  }

  get name() {
    return 'Eris';
  }

  onReady() {
    console.log(`${this.name} is ready!`);
  }

  onMessage(msg: Message) {
    console.log(`${this.name} received message: ${msg.content}`);
  }
}
