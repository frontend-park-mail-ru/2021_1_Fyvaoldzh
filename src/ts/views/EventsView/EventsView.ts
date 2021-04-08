import { channelNames } from '../../config/config';
import EventComponent from './EventComponent';
import Store from "../../storage/store";

const upperTextTemplate = require('Templates/events/upper-text.pug');

export default class EventsView {
  public globalStore: Store;
  public wrapper: HTMLElement;

  constructor(globalStore: Store) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');

  }

  renderEvents() {
    /* if (this.globalStore.currentPage !== pageNames.eventsPage) {
      return;
    }
    */
    const eventsJson = this.globalStore.eventsStore.allEvents;
    window.scroll(0, 0);
    this.wrapper.innerHTML = '';
    this.wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    this.wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');

    Object.entries(eventsJson).forEach(([, val]) => {
      const innerEvent = new EventComponent(eventsRow, val);
      innerEvent.render();
    });
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
