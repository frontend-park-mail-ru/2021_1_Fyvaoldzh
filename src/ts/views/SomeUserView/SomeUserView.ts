import { channelNames } from '../../config/config';
import Store from "../../storage/store";
import Actions from "../../actions/actions";

const profileTemplate = require('Templates/profile/profile.pug');

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class SomeUserView {
  public globalStore: Store;
  public actions: Actions;
  public wrapper: HTMLElement;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.actions = actions;
    this.wrapper = document.getElementById('wrapper');
  }

  renderSomeUser() {
    const { someUserData } = this.globalStore.someUserStore;
    this.wrapper.innerHTML = profileTemplate(someUserData);

    // ... TODO
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.someUserUpdated, this.renderSomeUser.bind(this));
  }
}
