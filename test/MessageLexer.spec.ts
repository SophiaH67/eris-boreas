import MessageLexer from '../src/classes/MessageLexer';

describe('Lexer', () => {
  it('should lex a simple string', () => {
    const lexer = new MessageLexer(`<@178210163369574401>
    
    What is the weather like today?`);
    const directives = lexer.directives;
    expect(directives).toHaveLength(2);
    expect(directives[0].value).toBe('<@178210163369574401>');
    expect(directives[1].value).toBe('What is the weather like today?');
  });

  it('should lex a string with code blocks', () => {
    const lexer = new MessageLexer(`<@178210163369574401>
    
    What is the weather like today?
    
    \`\`\`This is a code block
    \`\`\`
    `);
    const directives = lexer.directives;
    expect(directives).toHaveLength(3);
    expect(directives[0].value).toBe('<@178210163369574401>');
    expect(directives[1].value).toBe('What is the weather like today?');
    expect(directives[2].value).toBe('is a code block');
    expect(directives[2].language).toBe('This');
  });
});
