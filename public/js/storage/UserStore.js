import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
} from '../networkModule/network.js';

import { channelNames, profileTab, userStoreSymbols } from '../config/config.js';
import validation from '../validationModule/inputValidation.js';

const urltoFile = (url, filename, mimeType) => (fetch(url)
  .then((res) => res.arrayBuffer())
  .then((buf) => new File([buf], filename, { type: mimeType }))
);

export default class UserStore {
  constructor(globalStore) {
    this.globalStore = globalStore;
    this[userStoreSymbols.userDataSymbol] = null;
    this[userStoreSymbols.validationErrorsSymbol] = [];
    this[userStoreSymbols.currentTabSymbol] = profileTab.events;
    this[userStoreSymbols.avatarPreviewUrlSymbol] = null;
  }

  async register(action) {
    this[userStoreSymbols.validationErrorsSymbol] = validation(action.data);

    if (this[userStoreSymbols.validationErrorsSymbol].length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postRegistrationData(action.data);

      if (answer.ok) {
        this[userStoreSymbols.userDataSymbol] = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this[userStoreSymbols.validationErrorsSymbol].push('loginExist');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async login(action) {
    this[userStoreSymbols.validationErrorsSymbol] = validation(action.data);

    if (this[userStoreSymbols.validationErrorsSymbol].length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postLoginData(action.data);

      if (answer.ok) {
        this[userStoreSymbols.userDataSymbol] = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this[userStoreSymbols.validationErrorsSymbol].push('wrongLoginOrPass');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async update() {
    this[userStoreSymbols.userDataSymbol] = await getLoggedProfileData();
    if (this[userStoreSymbols.userDataSymbol].message === 'user is not authorized') {
      this.globalStore.eventBus.publish(channelNames.userIsNotAuth);
    } else {
      this.globalStore.eventBus.publish(channelNames.userUpdated);
    }
  }

  async logout() {
    this[userStoreSymbols.userDataSymbol] = {};
    logoutFunc();
    this.globalStore.eventBus.publish(channelNames.logoutSuccessfull);
  }

  async changeTab(action) {
    this[userStoreSymbols.currentTabSymbol] = action.data;
    this.globalStore.eventBus.publish(channelNames.tabChanged);
  }

  async postProfileForm(action) {
    this[userStoreSymbols.validationErrorsSymbol] = validation(action.data);

    if (this[userStoreSymbols.validationErrorsSymbol].length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
      return;
    }

    const answer = await postProfileData(action.data);

    if (answer.ok) {
      this.update();
    } else {
      this[userStoreSymbols.validationErrorsSymbol].push('emailExist');
      alert(1);
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    }
  }

  avatarPreview(action) {
    this[userStoreSymbols.avatarPreviewUrlSymbol] = action.data;
    this.globalStore.eventBus.publish(channelNames.avatarPreview);
  }

  async avatarPush() {
    const fileAvatar = await urltoFile(this.avatarPreviewUrl);
    const formPut = new FormData();
    formPut.append('avatar', fileAvatar);

    putAvatar(formPut);
    this.globalStore.eventBus.publish(channelNames.avatarPushed);
  }

  async avatarDecline() {
    this[userStoreSymbols.avatarPreviewUrlSymbol] = null;
    this.globalStore.eventBus.publish(channelNames.avatarDeclined);
  }

  reducer(action) {
    switch (action.eventName) {
      case 'user/register':
        this.register(action);
        break;

      case 'user/login':
        this.login(action);
        break;

      case 'user/update':
        this.update(action);
        break;

      case 'user/logout':
        this.logout(action);
        break;

      case 'user/changeTab':
        this.changeTab(action);
        break;

      case 'user/postProfileForm':
        this.postProfileForm(action);
        break;

      case 'user/avatarPreview':
        this.avatarPreview(action);
        break;

      case 'user/avatarPush':
        this.avatarPush(action);
        break;

      case 'user/avatarDecline':
        this.avatarDecline(action);
        break;

      default:
        break;
    }
  }

  get userData() {
    return this[userStoreSymbols.userDataSymbol];
  }

  get currentTab() {
    return this[userStoreSymbols.currentTabSymbol];
  }

  get validationErrors() {
    return this[userStoreSymbols.validationErrorsSymbol];
  }

  get avatarPreviewUrl() {
    return this[userStoreSymbols.avatarPreviewUrlSymbol];
  }
}
