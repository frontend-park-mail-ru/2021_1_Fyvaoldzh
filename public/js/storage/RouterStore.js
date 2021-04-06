import { channelNames } from '../config/config.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const currentUrlSymbol = Symbol('currentUrlSymbol');

export default class RouterStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[currentUrlSymbol] = null;
  }

  get currentPage() {
    return this[currentUrlSymbol];
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  changePage(action) {
    this[currentUrlSymbol] = new URL(action.data, 'http://localhost:3000/');
    window.history.pushState(null, action.data, action.data);
    this.globalStore.eventBus.publish(channelNames.pageChanged);
  }

  reducer(action) {
    switch (action.eventName) {
      case 'router/changePage':
        this.changePage(action);
        break;

      default:
        break;
    }
  }
}
