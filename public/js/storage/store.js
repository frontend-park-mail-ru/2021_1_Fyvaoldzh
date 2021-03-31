import { channelNames } from '../config/config.js';

export default class Store {
  constructor(eventBus) {
    this.eventBus = eventBus;
    this.currentPage = 'main';
    this.userStore = null;
    this.eventsStore = null;
    this.currentEventStore = null;
  }

  reducer(action) {
    if (action.eventName === 'changePage') {
      this.currentPage = action.data;
      this.eventBus.publish(channelNames.pageChanged);
      return;
    }

    if (action.eventName.includes('user/')) {
      this.userStore.reducer(action);
      return;
    }

    if (action.eventName.includes('events/')) {
      this.eventsStore.reducer(action);
      return;
    }

    if (action.eventName.includes('oneEvent/')) {
      this.oneEventStore.reducer(action);
    }
  }

  getValidationErrors() {
    return this.validationErrors;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}
