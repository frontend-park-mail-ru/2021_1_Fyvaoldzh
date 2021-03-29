import { channelNames } from '../../config/config.js';

export default class OneEventView {
  constructor({eventBus, oneEventStore}) {
    this.eventBus = eventBus;
    this.oneEventStore = oneEventStore;
  }

  renderEventPage() {
    window.scroll(0, 0);
    const eventData = this.oneEventStore.getData();
    wrapper.style.backgroundImage =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';
    wrapper.innerHTML = oneEventPageTemplate(eventData);
  }

  subscribeViews() {
    this.eventBus.subscribe(channelNames.eventCome, this.renderEventPage.bind(this));
  }
}
