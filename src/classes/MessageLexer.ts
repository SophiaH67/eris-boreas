/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Stream } from 'stream';
import Directive from './Directive';

/**
 * This class is responsible for extracting all directives from a message.
 * For definition of a directive see the class `Directive`.
 */
export default class MessageLexer {
  public directives: Directive[] = [];

  constructor(private readonly input: string) {
    let parts = this.input.split('```');
    parts = parts.map((part, index) =>
      index % 2 === 0 ? part : part.replace(/\n/g, 'CODEBLOCK_NEWLINE')
    );
    this.input = parts.join('```');

    this.directives = this.input
      .split(/\n[ ]*\n[ ]*/g)
      .map(
        text => new Directive(text.replace('CODEBLOCK_NEWLINE', '\n').trim())
      );
  }
}
