import { channelNames, storeSymbols } from '../../config/config.js';

export default class OneEventView {
  constructor({ eventBus, globalStore }) {
    this.eventBus = eventBus;
    this.globalStore = globalStore;
  }

  renderEventPage() {
    window.scroll(0, 0);
    const eventData = this.globalStore[storeSymbols.oneEventStoreSymbol].oneEvent;
    wrapper.style.backgroundImage = 'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';
    wrapper.innerHTML = oneEventPageTemplate(eventData);
  }

  subscribeViews() {
    this.eventBus.subscribe(channelNames.eventCome, this.renderEventPage.bind(this));
  }
}
