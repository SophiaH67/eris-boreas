/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-empty-function */
import * as relexer from 'relexer';
import { Stream } from 'stream';
import Directive from './Directive';

export default class MessageLexer {
  private rules: relexer.Rules = [
    /* A directive is either at the beginning, or preceded by whitespace.
      It goes until either a newline or the end of the string. */
    {
      re: '(^|\n[ ]*\n).*',
      action: async (match, _pos) => {
        const directive = new Directive(match.trim());
        this.directives.push(directive);
      },
    },
  ];
  public directives: Directive[] = [];
  private lexer = relexer.create(this.rules);

  constructor(private readonly input: string) {}

  async lex(): Promise<Directive[]> {
    await this.lexer.lex(Stream.Readable.from(this.input));
    return this.directives;
  }
}
