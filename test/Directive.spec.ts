import Directive from '../src/classes/Directive';

describe('Directive', () => {
  it('should be constructable', () => {
    const directive = new Directive('<@178210163369574401>');
    expect(directive).toBeDefined();
  });

  it('should have a value', () => {
    const directive = new Directive('<@178210163369574401>');
    expect(directive.value).toBe('<@178210163369574401>');
  });
});
