import { channelNames, pageNames, storeSymbols } from '../config/config.js';
import UserStore from './UserStore.js';
import EventsStore from './EventsStore.js';
import OneEventStore from './OneEventStore.js';

export default class Store {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this[storeSymbols.currentPageSymbol] = pageNames.eventsPage;
    this[storeSymbols.userStoreSymbol] = new UserStore(this);
    this[storeSymbols.eventsStoreSymbol] = new EventsStore(this);
    this[storeSymbols.oneEventStoreSymbol] = new OneEventStore(this);
  }

  reducer(action) {
    if (action.eventName === 'changePage') {
      this[storeSymbols.currentPageSymbol] = action.data;
      this.eventBus.publish(channelNames.pageChanged);
      return;
    }

    if (action.eventName.includes('user/')) {
      this[storeSymbols.userStoreSymbol].reducer(action);
      return;
    }

    if (action.eventName.includes('events/')) {
      this[storeSymbols.eventsStoreSymbol].reducer(action);
      return;
    }

    if (action.eventName.includes('oneEvent/')) {
      this[storeSymbols.oneEventStoreSymbol].reducer(action);
    }
  }

  get currentPage() {
    return this[storeSymbols.currentPageSymbol];
  }
}
