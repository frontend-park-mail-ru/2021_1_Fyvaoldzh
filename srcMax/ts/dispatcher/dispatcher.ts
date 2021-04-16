import { ActionsInterface } from '../interfaces';

export default class Dispatcher {
  public channel: Array<Function>;

  constructor() {
    this.channel = [];
  }

  dispatch(action: ActionsInterface) {
    this.channel.forEach((listener) => listener(action));
  }

  register(listener: Function) {
    this.channel.push(listener);
  }
}
