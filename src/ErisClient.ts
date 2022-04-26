/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Client, Message } from 'discord.js';
import { readdirSync } from 'fs';
import { createClient } from 'redis';
import Command from './conversation/Command';
import ConversationManager from './conversation/ConversationManager';
import DirectiveHandler from './conversation/DirectiveHandler';
import ErisMessage from './interfaces/ErisMessage';

export default class ErisClient {
  bot: Client;
  public redis = createClient();
  public conversationManager = new ConversationManager();
  public directiveHandler = new DirectiveHandler(this);
  public commands: Command[] = [];

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

  async onMessage(_msg: Message) {
    (_msg as ErisMessage).eris = this;
    const msg = _msg as ErisMessage;
    if (msg.author?.id === this.bot?.user?.id) return;
    const conversation = this.conversationManager.addToOrNewConversation(msg);
    if (!conversation.isWaitingForReply()) {
      await conversation.executeDirectives();
    }
  }

  loadCommands(path: string) {
    const files = readdirSync(path);
    files.forEach(file => {
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        const command = require(`${path}/${file}`);
        this.commands.push(new command.default(this) as Command);
      }
    });
  }
}
