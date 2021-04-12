import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
} from '../networkModule/network';

import { channelNames, profileTab } from '../config/config';
import validation from '../validationModule/inputValidation';
import { ActionsInterface } from "../interfaces";

const urltoFile = (url: string, filename?: string, mimeType?: string) => (fetch(url)
  .then((res) => res.arrayBuffer())
  .then((buf) => new File([buf], filename, { type: mimeType }))
);

interface userDataInterface {
  Uid: number;
  name: string;
  birthday: string;
  city: string;
  email: string;
  visited: number;
  planning: number;
  followers: number;
  about: string;
  avatar: string;
  events: string;
  message?: string;
}

export default class UserStore {
  public globalStore: any;
  public userData: userDataInterface;
  public validationErrors: Array<String>;
  public currentTab: string;
  public avatarPreviewUrl: string;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.userData = null;
    this.validationErrors = [];
    this.currentTab = profileTab.events;
    this.avatarPreviewUrl = null;
  }

  async register(action: ActionsInterface) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postRegistrationData(action.data);

      if (answer.ok) {
        this.userData = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this.validationErrors.push('loginExist');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async login(action: ActionsInterface) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    } else {
      const answer = await postLoginData(action.data);

      if (answer.ok) {
        this.userData = await getLoggedProfileData();
        this.globalStore.eventBus.publish(channelNames.registerSuccessfull);
      } else {
        this.validationErrors.push('wrongLoginOrPass');
        this.globalStore.eventBus.publish(channelNames.errorValidation);
      }
    }
  }

  async update(action: ActionsInterface) {
    this.userData = await getLoggedProfileData();

    const queryParamTab = this.globalStore.routerStore.currentUrl?.searchParams.get('tab');
    if (queryParamTab) {
      this.currentTab = queryParamTab;
    }

    if (this.userData.message === 'user is not authorized') {
      this.userData = null;

      if (action?.data) {
        this.globalStore.eventBus.publish(channelNames.firstUserIsNotAuth);
      }
      this.globalStore.eventBus.publish(channelNames.userIsNotAuth);
    } else {
      if (action?.data) {
        this.globalStore.eventBus.publish(channelNames.firstUserUpdated);
      }
      this.globalStore.eventBus.publish(channelNames.userUpdated);
    }
  }

  async logout() {
    this.userData = null;
    await logoutFunc();
    this.globalStore.eventBus.publish(channelNames.logoutSuccessfull);
  }

  async changeTab(action: ActionsInterface) {
    history.pushState({page: '/profile', parameter: action.data}, null, `profile?tab=${action.data}`);
    this.currentTab = <string><unknown>action.data;
    this.globalStore.eventBus.publish(channelNames.tabChanged);
  }

  async postProfileForm(action: ActionsInterface) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(channelNames.errorValidation);
      return;
    }

    const answer = await postProfileData(action.data);

    if (answer.ok) {
      await this.update(null);
    } else {
      this.validationErrors.push('emailExist');
      this.globalStore.eventBus.publish(channelNames.errorValidation);
    }
  }

  avatarPreview(action: ActionsInterface) {
    this.avatarPreviewUrl = <string><unknown>action.data;
    this.globalStore.eventBus.publish(channelNames.avatarPreview);
  }

  async avatarPush() {
    const fileAvatar = await urltoFile(this.avatarPreviewUrl);
    const formPut = new FormData();
    formPut.append('avatar', fileAvatar);

    await putAvatar(formPut);
    this.globalStore.eventBus.publish(channelNames.avatarPushed);
  }

  async avatarDecline() {
    this.avatarPreviewUrl = null;
    this.globalStore.eventBus.publish(channelNames.avatarDeclined);
  }

  reducer(action: ActionsInterface) {
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
        this.logout();
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
        this.avatarPush();
        break;

      case 'user/avatarDecline':
        this.avatarDecline();
        break;

      default:
        break;
    }
  }
}
