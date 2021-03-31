import { pageNames, channelNames } from '../../config/config.js';
import EventComponent from './EventComponent.js';

export default class EventsView {
  constructor({ eventBus, eventsStore, globalStore }) {
    this.eventBus = eventBus;
    this.eventsStore = eventsStore;
    this.globalStore = globalStore;
  }

  renderEvents() {
    if (this.globalStore.getCurrentPage() !== pageNames.eventsPage) {
      return;
    }
    const eventsJson = this.eventsStore.getData();
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
