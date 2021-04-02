import { getAllEventsJson } from '../networkModule/network.js';
import { channelNames } from '../config/config.js';

const allEvents = Symbol('allEvents');

export default class EventsStore {
  constructor(globalStore) {
    this.globalStore = globalStore;
    this.globalStore.eventsStore = this;
    this[allEvents] = null;
  }

  async update() {
    this[allEvents] = await getAllEventsJson();
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

  get allEvents() {
    return this[allEvents];
  }
}
