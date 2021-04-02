import { pageNames, channelNames, storeSymbols } from '../../config/config.js';
import EventComponent from './EventComponent.js';

export default class EventsView {
  constructor({ eventBus, globalStore }) {
    this.eventBus = eventBus;
    this.globalStore = globalStore;
  }

  renderEvents() {
    if (this.globalStore.currentPage !== pageNames.eventsPage) {
      return;
    }
    const eventsJson = this.globalStore[storeSymbols.eventsStoreSymbol].allEvents;
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
    this.eventBus.subscribe(channelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
