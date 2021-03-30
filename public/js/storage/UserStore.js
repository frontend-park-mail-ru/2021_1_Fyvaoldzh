import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
} from '../networkModule/network.js';

import { channelNames } from '../config/config.js'
import { validation } from '../validationModule/inputValidation.js'
import { actions } from '../main.js';

const profileTab = {
  about: 'aboutTab',
  settings: 'settingsTab',
  events: 'eventsTab',
}

export default class UserStore {
  constructor(globalStore) {
    this.globalStore = globalStore;
    this.globalStore.userStore = this;
    this.data = null;
    this.validationErrors = [];
    this.profileTab = profileTab.events;
    this.avatarPreviewFile = null;
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

  async changeTab(action) {
    this.profileTab = action.data;
    this.globalStore.eventBus.publish(channelNames.tabChanged);
  }

  async postProfileForm(action) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
      return;
    }

    const answer = await postProfileData(action.data);
    
    if (answer.ok) {
      actions.updateUser();
    } else {
      this.validationErrors.push('emailExist');
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    }
  }

  avatarPreview(action) {
    this.avatarPreviewFile = action.data;
    this.globalStore.eventBus.publish(channelNames.avatarPreview);
  }

  async avatarPush() {
    const fileAvatar = await urltoFile(this.getAvatarPreview());
    let formPut = new FormData();
    formPut.append("avatar", fileAvatar);
    
    putAvatar(formPut);
    this.globalStore.eventBus.publish(channelNames.userUpdated);
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

      default:
        break;
    }
  }

  getData() {
    return this.data;
  }

  getTab() {
    return this.profileTab;
  }

  getValidationErrors() {
    return this.validationErrors;
  }

  getAvatarPreview() {
    return this.avatarPreviewFile;
  }
}

function urltoFile(url, filename, mimeType){
  return (fetch(url)
    .then(function(res){return res.arrayBuffer();})
    .then(function(buf){return new File([buf], filename,{type:mimeType});})
    );
}