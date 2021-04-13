import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
  getEventById,
} from '../networkModule/network.js';

import {channelNames, profileEventsButton, profileTab} from '../config/config.js';
import validation from '../validationModule/inputValidation.js';

const urltoFile = (url, filename, mimeType) =>
  fetch(url)
    .then(res => res.arrayBuffer())
    .then(buf => new File([buf], filename, {type: mimeType}));

const userDataSymbol = Symbol('UserData');
const validationErrorsSymbol = Symbol('validationErrorsSymbol');
const currentTabSymbol = Symbol('CurrentTabSymbol');
const avatarPreviewUrlSymbol = Symbol('avatarPreviewUrlSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');
const currentEventsButtonSymbol = Symbol('currentEventsButtonSymbol');
const profilePlanningEventsSymbol = Symbol('profilePlanningEventsSymbol');
const profileVisitedEventsSymbol = Symbol('profileVisitedEventsSymbol');

export default class UserStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[userDataSymbol] = null;
    this[validationErrorsSymbol] = [];
    this[currentTabSymbol] = profileTab.events; //нельзя менять - верстка то не подстраивается, в ней всегда ивенты поначалу выбраны
    this[currentEventsButtonSymbol] = profileEventsButton.planning;
    this[avatarPreviewUrlSymbol] = null;
    this[profilePlanningEventsSymbol] = [];
    this[profileVisitedEventsSymbol] = [];
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get userData() {
    return this[userDataSymbol];
  }

  get validationErrors() {
    return this[validationErrorsSymbol];
  }

  get currentTab() {
    return this[currentTabSymbol];
  }

  get currentEventsButton() {
    return this[currentEventsButtonSymbol];
  }

  get avatarPreviewUrl() {
    return this[avatarPreviewUrlSymbol];
  }

  get profilePlanningEvents() {
    return this[profilePlanningEventsSymbol];
  }

  set profilePlanningEvents(value) {
    this[profilePlanningEventsSymbol] = value;
  }

  get profileVisitedEvents() {
    return this[profileVisitedEventsSymbol];
  }

  set profileVisitedEvents(value) {
    this[profileVisitedEventsSymbol] = value;
  }

  async register(action) {
    this[validationErrorsSymbol] = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postRegistrationData(action.data);

      if (answer.ok) {
        this[userDataSymbol] = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this.validationErrors.push('loginExist');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async login(action) {
    this[validationErrorsSymbol] = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postLoginData(action.data);

      if (answer.ok) {
        this[userDataSymbol] = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this.validationErrors.push('wrongLoginOrPass');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async update() {
    this[userDataSymbol] = await getLoggedProfileData();
    this[currentTabSymbol] = profileTab.events;
    this[currentEventsButtonSymbol] = profileEventsButton.planning;
    if (this.userData.message === 'user is not authorized') {
      this.globalStore.eventBus.publish(channelNames.userIsNotAuth);
    } else {
      await this.updateEvents();
      this.globalStore.eventBus.publish(channelNames.userUpdated);
    }
  }

  async logout() {
    this[userDataSymbol] = {};
    logoutFunc();
    this.globalStore.eventBus.publish(channelNames.logoutSuccessfull);
  }

  async changeTab(action) {
    this[currentTabSymbol] = action.data;
    if (this[currentTabSymbol] === profileTab.events) {
      this[currentEventsButtonSymbol] = profileEventsButton.planning;
    }
    this.globalStore.eventBus.publish(channelNames.tabChanged);
  }

  async changeEventsButton(action) {
    this[currentEventsButtonSymbol] = action.data;
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(channelNames.userEventsButtonChanged, this.profilePlanningEvents);
        break;
      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(channelNames.userEventsButtonChanged, this.profileVisitedEvents);
        break;
    }
  }

  async updateEvents() {
    this.profilePlanningEvents.length = 0;
    this.profileVisitedEvents.length = 0;

    for (const event of this.userData.planning) {
      this.profilePlanningEvents.push(event);
    }
    for (const event of this.userData.visited) {
      this.profileVisitedEvents.push(event);
    }
  }

  async postProfileForm(action) {
    this[validationErrorsSymbol] = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
      return;
    }

    const answer = await postProfileData(action.data);

    if (answer.ok) {
      this.update();
    } else {
      this.validationErrors.push('emailExist');
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    }
  }

  avatarPreview(action) {
    this[avatarPreviewUrlSymbol] = action.data;
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
    this[avatarPreviewUrlSymbol] = null;
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

      case 'user/changeEventsButton':
        this.changeEventsButton(action);
        break;

      case 'user/updateEvents':
        this.updateEvents(action);
        break;

      default:
        break;
    }
  }
}
