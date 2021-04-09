import {channelNames} from '../../config/config.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class OneEventView {
  constructor({globalStore}) {
    this[globalStoreSymbol] = globalStore;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  renderEventPage() {
    window.scroll(0, 0);
    const {oneEventData} = this.globalStore.oneEventStore;
    wrapper.style.backgroundImage =
      'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';
    wrapper.innerHTML = oneEventPageTemplate(oneEventData);
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventCome, this.renderEventPage.bind(this));
  }
}
