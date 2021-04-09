import { getEventById } from '../networkModule/network.js';
import { channelNames } from '../config/config.js';

const oneEventDataSymbol = Symbol('oneEventDataSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class OneEventStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[oneEventDataSymbol] = null;
  }

  get oneEventData() {
    return this[oneEventDataSymbol];
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  async update(action) {
    this[oneEventDataSymbol] = await getEventById(action.data);
    this.globalStore.eventBus.publish(channelNames.eventCome);
  }

  reducer(action) {
    switch (action.eventName) {
      case 'oneEvent/update':
        this.update(action);
        break;

      default:
        break;
    }
  }
}
