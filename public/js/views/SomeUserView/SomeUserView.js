import { channelNames } from '../../config/config.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class SomeUserView {
  constructor({
    globalStore, actions,
  }) {
    this[globalStoreSymbol] = globalStore;
    this[actionsSymbol] = actions;
    this.wrapper = document.getElementById('wrapper');
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get actions() {
    return this[actionsSymbol];
  }

  renderSomeUser() {
    window.scroll(0, 0);
    const { someUserData } = this.globalStore.someUserStore;
    this.wrapper.innerHTML = profileTemplate(someUserData);

    // ... TODO
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.someUserUpdated, this.renderSomeUser.bind(this));
  }
}
