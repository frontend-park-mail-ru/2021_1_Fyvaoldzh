import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
} from '../networkModule/network.js';

import { channelNames } from '../config/config.js'
import { validation } from '../validationModule/inputValidation.js'

export default class UserStore {
  constructor(globalStore) {
    this.globalStore = globalStore;
    this.globalStore.userStore = this;
    this.data = null;
    this.validationErrors = [];
    this.profileTab = 'about';
  }

  async register(action) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postRegistrationData(action.data);

      if (answer.ok) {
        this.data = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this.validationErrors.push('loginExist');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async login(action) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postLoginData(action.data);

      if (answer.ok) {
        this.data = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this.validationErrors.push('wrongLoginOrPass');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async update() {
    this.data = await getLoggedProfileData();
    if (this.data.message === 'user is not authorized') {
      this.globalStore.eventBus.publish(channelNames.userIsNotAuth);
    } else {
      this.globalStore.eventBus.publish(channelNames.userUpdated);
    }
  }

  async logout() {
    this.data = {};
    logoutFunc();
    this.globalStore.eventBus.publish(channelNames.logoutSuccessfull);
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

      default:
        break;
    }
  }

  getData() {
    return this.data;
  }

  getValidationErrors() {
    return this.validationErrors;
  }
}