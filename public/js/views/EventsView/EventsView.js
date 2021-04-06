import { channelNames } from '../../config/config.js';
import EventComponent from './EventComponent.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class EventsView {
  constructor({ globalStore }) {
    this[globalStoreSymbol] = globalStore;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  renderEvents() {
    /* if (this.globalStore.currentPage !== pageNames.eventsPage) {
      return;
    }
    */
    const eventsJson = this.globalStore.eventsStore.allEvents;
    window.scroll(0, 0);
    wrapper.innerHTML = '';
    wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');

    Object.entries(eventsJson).forEach(([, val]) => {
      const innerEvent = new EventComponent({ parent: eventsRow, data: val });
      innerEvent.render();
    });
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
