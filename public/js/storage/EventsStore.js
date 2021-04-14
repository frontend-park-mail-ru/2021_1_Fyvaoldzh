import {getAllEventsJson} from '../networkModule/network.js';
import {channelNames} from '../config/config.js';

const allEventsSymbol = Symbol('allEventsSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class EventsStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[allEventsSymbol] = null;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get allEvents() {
    return this[allEventsSymbol];
  }

  async update() {
    this[allEventsSymbol] = await getAllEventsJson();
    this.globalStore.eventBus.publish(channelNames.eventsUpdated);
  }

  reducer(action) {
    switch (action.eventName) {
      case 'events/update':
        this.update(action);
        break;

      default:
        break;
    }
  }
}
