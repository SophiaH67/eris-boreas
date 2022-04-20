import Directive from '../src/classes/Directive';

describe('Directive', () => {
  it('should be constructable', () => {
    const directive = new Directive('<@178210163369574401>');
    expect(directive).toBeDefined();
  });

  it('should have a terminator', () => {
    const directive = new Directive('<@178210163369574401>');
    expect(directive.terminator).toBe('');
    expect(directive.value).toBe('<@178210163369574401>');
    const directive2 = new Directive('<@178210163369574401>?');
    expect(directive2.terminator).toBe('?');
    expect(directive2.value).toBe('<@178210163369574401>');
  });
});
