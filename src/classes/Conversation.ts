import { Message } from 'discord.js';

export default class Conversation {
  public finished = false;
  constructor(public authorId: string, public messages: Message[]) {}
}
