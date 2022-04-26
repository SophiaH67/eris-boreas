import { Message } from 'discord.js';
import ErisClient from '../ErisClient';

export default interface ErisMessage extends Message {
  eris: ErisClient;
}
