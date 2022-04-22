import type RedisClient from '../../ErisClient';
import { Message } from 'discord.js';
import Directive from '../Directive';
import Command from './Command';
import CommandNotFoundException from './CommandNotFoundException';

export default class CommandContext {
  public command: Command;
  public args: string[];

  constructor(
    public readonly directive: Directive,
    public readonly bot: RedisClient,
    public readonly message: Message
  ) {
    let command: Command | undefined;
    let alias: string | undefined;
    for (const c of this.bot.commands) {
      for (const a of c.aliases) {
        if (this.directive.value.toLowerCase().startsWith(a)) {
          command = c;
          alias = a;
          break;
        }
      }
    }
    if (!command || !alias) {
      throw new CommandNotFoundException();
    }
    this.command = command;
    this.args = this.directive.value.slice(alias.length).trim().split(' ');
  }
}
