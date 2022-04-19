/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Message } from 'discord.js';
import ErisClient from '../ErisClient';
import Conversation from './Conversation';

export default class MessageSponge {
  public conversations = new Map<string, Conversation>();
  constructor(public bot: ErisClient) {}

  public getConversation(msg: Message): Conversation | undefined {
    if (!msg.reference?.messageId) return;
    if (!this.conversations.has(msg.reference.messageId)) return;
    // Check author
    const conversation = this.conversations.get(msg.reference.messageId)!;
    if (conversation.authorId !== msg.author.id) return;
    return conversation;
  }

  public onMessage(msg: Message): undefined | Conversation {
    /* This function is called on every message, it is responsible for
      handling the message and deciding whether or not to create a new
      conversation and adding messages to it. It returns undefined if the
      message is not relevant to the bot, or a Conversation object if the
      conversation is finished. */
    const conversation = this.getConversation(msg);
    if (conversation) {
      if (conversation.finished) return;
      conversation.messages.push(msg);
    }

    if (msg.content.toLowerCase().endsWith('\nalso')) {
      if (!conversation) {
        this.conversations.set(msg.id, new Conversation(msg.author.id, [msg]));
      }
      return;
    } else if (conversation) {
      conversation.finished = true;
    }
  }
}
