export default class CommandException extends Error {
  constructor() {
    super('Command not found');
  }
}
