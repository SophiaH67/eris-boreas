import Lexer, { Directive, TokenType } from '../src/classes/Lexer';

describe('Lexer', () => {
  it('should lex a simple string', async () => {
    const lexer = new Lexer('receiver\n\n');
    const tokens = await lexer.lex();
    expect(tokens).toEqual([
      { type: TokenType.DIRECTIVE, value: Directive.RECEIVER },
    ]);
  });

  it('should lex a string with arguments', async () => {
    const lexer = new Lexer('receiver Fredi\n\nalso');
    const tokens = await lexer.lex();
    expect(tokens).toEqual([
      { type: TokenType.DIRECTIVE, value: Directive.RECEIVER },
      { type: TokenType.ARGUMENT, value: 'Fredi' },
      { type: TokenType.DIRECTIVE, value: Directive.ALSO },
    ]);
  }
});
