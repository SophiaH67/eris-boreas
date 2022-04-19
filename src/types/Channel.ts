import {
  DMChannel,
  NewsChannel,
  PartialDMChannel,
  TextChannel,
  ThreadChannel,
} from 'discord.js';

type Channel =
  | DMChannel
  | PartialDMChannel
  | NewsChannel
  | TextChannel
  | ThreadChannel;
export default Channel;
