export class Dispatcher {
    constructor(storage) {
        this.channel = [];
    }

    dispatch(action) {
        this.channel.forEach(listener => listener(action));
    }

    register(listener) {
        this.channel.push(listener);
    }
}