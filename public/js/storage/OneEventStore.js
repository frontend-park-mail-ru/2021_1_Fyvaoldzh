import { getEventById } from '../networkModule/network.js';
import { channelNames } from '../config/config.js';

const oneEvent = Symbol('OneEvent');

export default class OneEventStore {
  constructor(globalStore) {
    this.globalStore = globalStore;
    globalStore.oneEventStore = this;
    this[oneEvent] = null;
  }

  async update(action) {
    this[oneEvent] = await getEventById(action.data);
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

  get oneEvent() {
    return this[oneEvent];
  }
}
