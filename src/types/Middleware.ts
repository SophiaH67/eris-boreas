import Message from '../generic/Message';

export default abstract class Middleware {
  public abstract name: string;
  public abstract onMessage(msg: Message, next: () => void): void;
}
