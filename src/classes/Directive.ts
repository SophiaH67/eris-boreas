/**
 * A directive is a full command with all args included.
 * Parsing of the content of a directive is done at a later stage.
 *
 * The reason this is a class and not just a string is for future
 * flexibility.
 */
export default class Directive {
  constructor(public value: string) {}
}
