export default class Directive {
  public terminator: '!' | '?' | '.' | '';
  constructor(public value: string) {
    // Check last character for terminator
    const lastChar = this.value.charAt(this.value.length - 1);
    if (lastChar === '!' || lastChar === '?' || lastChar === '.') {
      this.terminator = lastChar;
      this.value = this.value.substring(0, this.value.length - 1);
    } else {
      this.terminator = '';
    }
  }
}
