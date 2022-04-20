/**
 * A directive is a full command with all args included.
 * Parsing of the content of a directive is done at a later stage.
 *
 * The reason this is a class and not just a string is for future
 * flexibility.
 */
export default class Directive {
  public language: string | undefined;
  constructor(public value: string) {
    this.language = this.value.startsWith('```')
      ? (() => {
          const language = this.value.split('```')[1].split(/ |\n/)[0];
          this.value = this.value.replace(/```/g, '').trim();
          return language;
        })()
      : undefined;
  }
}
