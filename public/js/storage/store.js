import { channelNames } from '../config/config.js';
import UserStore from './UserStore.js';
import EventsStore from './EventsStore.js';
import OneEventStore from './OneEventStore.js';
import RouterStore from './RouterStore.js';
import OneProfileStore from './OneProfileStore.js';

const currentPageSymbol = Symbol('currentPageSymbol'); // Используем символы для приватности значений класса.
const userStoreSymbol = Symbol('userStoreSymbol');
const eventsStoreSymbol = Symbol('eventsStoreSymbol');
const oneEventStoreSymbol = Symbol('oneEventStoreSymbol');
const eventBusSymbol = Symbol('eventBusSymbol');
const routerStoreSymbol = Symbol('routerStoreSymbol');
const oneProfileStoreSymbol = Symbol('oneProfileStoreSymbol');

export default class Store {
  constructor(eventBus) {
    this[eventBusSymbol] = eventBus;
    this[userStoreSymbol] = new UserStore(this);
    this[eventsStoreSymbol] = new EventsStore(this);
    this[oneEventStoreSymbol] = new OneEventStore(this);
    this[routerStoreSymbol] = new RouterStore(this);
    this[oneProfileStoreSymbol] = new OneProfileStore(this);
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

  get routerStore() {
    return this[routerStoreSymbol];
  }

  get someUserStore() {
    return this[someUserStoreSymbol];
  }

  get oneProfileStore() {
    return this[oneProfileStoreSymbol];
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
      return;
    }

    if (action.eventName.includes('router/')) {
      this.routerStore.reducer(action);
      return;
    }

    if (action.eventName.includes('oneProfile/')) {
      this.oneProfileStore.reducer(action);
    }
  }
}
