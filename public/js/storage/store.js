import { channelNames, pageNames } from '../config/config.js';
import UserStore from './UserStore.js';
import EventsStore from './EventsStore.js';
import OneEventStore from './OneEventStore.js';

const currentPageSymbol = Symbol('currentPageSymbol'); // Используем символы для приватности значений класса.
const userStoreSymbol = Symbol('userStoreSymbol');
const eventsStoreSymbol = Symbol('eventsStoreSymbol');
const oneEventStoreSymbol = Symbol('oneEventStoreSymbol');
const eventBusSymbol = Symbol('eventBusSymbol');

export default class Store {
  constructor(eventBus) {
    this[eventBusSymbol] = eventBus;
    this[currentPageSymbol] = pageNames.eventsPage;
    this[userStoreSymbol] = new UserStore(this);
    this[eventsStoreSymbol] = new EventsStore(this);
    this[oneEventStoreSymbol] = new OneEventStore(this);
  }

  reducer(action) {
    if (action.eventName === 'changePage') {
      this[currentPageSymbol] = action.data;
      this.eventBus.publish(channelNames.pageChanged);
      return;
    }

    if (action.eventName.includes('user/')) {
      this[userStoreSymbol].reducer(action);
      return;
    }

    if (action.eventName.includes('events/')) {
      this[eventsStoreSymbol].reducer(action);
      return;
    }

    if (action.eventName.includes('oneEvent/')) {
      this[oneEventStoreSymbol].reducer(action);
    }
  }

  get eventBus() {
    return this[eventBusSymbol];
  }

  get currentPage() {
    return this[currentPageSymbol];
  }

  get userStore() {
    return this[userStoreSymbol];
  }

  get eventsStore() {
    return this[eventsStoreSymbol];
  }

  get oneEventStore() {
    return this[oneEventStoreSymbol];
  }
}
