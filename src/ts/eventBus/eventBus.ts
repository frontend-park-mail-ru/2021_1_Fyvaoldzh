export default class EventBus {
  public channels: Array<Array<Function>>;

  constructor() {
    this.channels = [];
  }

  subscribe(channelName: number, listener: Function) {
    if (!this.channels[channelName]) {
      this.channels[channelName] = [];
    }
    this.channels[channelName].push(listener);
  }

  publish(channelName: number, data: object = null) {
    const channel = this.channels[channelName];
    if (!channel || !channel.length) {
      return;
    }

    channel.forEach(listener => listener(data));
  }
}
