export class Dispatcher {
    constructor() {
        this.channel = [];
    }

    dispatch(action) {
        this.channel.forEach(listener => listener(action));
    }

    register(listener) {
        this.channel.push(listener);
    }
}