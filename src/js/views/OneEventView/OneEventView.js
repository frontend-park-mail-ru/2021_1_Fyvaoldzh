import { channelNames } from '../../config/config.js';

const oneEventPageTemplate = require('Templates/one-event-page/one-event-page.pug');

const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class OneEventView {
  constructor({ globalStore }) {
    this[globalStoreSymbol] = globalStore;
    this.wrapper = document.getElementById('wrapper');
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  renderEventPage() {
    window.scroll(0, 0);
    const { oneEventData } = this.globalStore.oneEventStore;
    this.wrapper.style.backgroundImage = 'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = oneEventPageTemplate(oneEventData);
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventCome, this.renderEventPage.bind(this));
  }
}
