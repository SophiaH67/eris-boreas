import { Client, Message } from 'discord.js';
import { createClient } from 'redis';
import ConversationManager from './conversation/ConversationManager';

export default class ErisClient {
  bot: Client;
  public redis = createClient();
  public conversationManager = new ConversationManager();

  constructor(discordClient: Client) {
    this.bot = discordClient;

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
    const conversation = this.conversationManager.addToOrNewConversation(msg);
    if (!conversation.isWaitingForReply()) conversation.executeDirectives();
  }
}
