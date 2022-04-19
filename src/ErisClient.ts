import { Client, Message } from 'discord.js';
import Middleware from './types/Middleware';

export default class ErisClient {
  public static middleware: Middleware[] = [];

  constructor(public bot: Client) {
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
