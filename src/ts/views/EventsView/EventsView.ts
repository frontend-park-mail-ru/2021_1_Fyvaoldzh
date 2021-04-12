import { channelNames } from '../../config/config';
import EventComponent from './EventComponent';
import Store from "../../storage/store";
import Actions from "../../actions/actions";

const upperTextTemplate = require('Templates/events/upper-text.pug');

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class EventsView {
  public globalStore: Store;
  public wrapper: HTMLElement;
  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
  }

  renderEvents() {
    /* if (this.globalStore.currentPage !== pageNames.eventsPage) {
      return;
    }
    */
    const eventsJson = this.globalStore.eventsStore.allEvents;
    this.wrapper.innerHTML = '';
    this.wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    this.wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');

    Object.entries(eventsJson).forEach(([, val]) => {
      const innerEvent = new EventComponent(eventsRow, val);
      innerEvent.render();
    });

    window.addEventListener('scroll', this.infinityScroll.bind(this));
  }

  async infinityScroll() {
    const eventsRow = document.getElementById('events-row');

    const contentHeight = eventsRow.offsetHeight;
    const windowOffsetY = window.pageYOffset;

    const windowHeight = window.innerHeight;

    if (windowOffsetY + windowHeight > contentHeight) {
      this.actions.uploadEventsContent();
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventsUpdated, this.renderEvents.bind(this));
  }
}
