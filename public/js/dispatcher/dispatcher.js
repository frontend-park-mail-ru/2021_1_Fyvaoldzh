export class Dispatcher {
    constructor(storage) {
        this.storage = storage;
    }

    dispatch(action) {
        this.storage.register(action);
    }
}