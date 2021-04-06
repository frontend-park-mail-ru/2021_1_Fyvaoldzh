import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
} from '../networkModule/network.js';

import {channelNames, profileTab} from '../config/config.js';
import validation from '../validationModule/inputValidation.js';

const urltoFile = (url, filename, mimeType) =>
  fetch(url)
    .then(res => res.arrayBuffer())
    .then(buf => new File([buf], filename, {type: mimeType}));

const oneProfileDataSymbol = Symbol('oneProfileData');
const currentTabSymbol = Symbol('CurrentTabSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');
const profileEventsSymbol = Symbol('profileEventsSymbol');

export default class oneProfileStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[oneProfileDataSymbol] = null;
    this[currentTabSymbol] = profileTab.events;
    this[profileEventsSymbol] = [];
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get oneProfileData() {
    return this[oneProfileDataSymbol];
  }

  get currentTab() {
    return this[currentTabSymbol];
  }

  async changeTab(action) {
    this[currentTabSymbol] = action.data;
    this.globalStore.eventBus.publish(channelNames.tabChanged);
  }

  async updateEvents(action) {
    this[profileEventsSymbol] = Array.from(action.data);
    this.globalStore.eventBus.publish(channelNames.updateOneProfileEvents); //тут же вызываем все функции из этого ченнела(?)
  }

  reducer(action) {
    switch (action.eventName) {
      case 'user/changeTab':
        this.changeTab(action);
        break;

      case 'oneProfile/updateEvents':
        this.updateEvents(action);
        break;

      default:
        break;
    }
  }
}
