import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
  getEventById,
} from "../networkModule/network";

import {
  ChannelNames,
  profileEventsButton,
  profileTab,
} from "../config/config";
import validation from "../validationModule/inputValidation";
import { ActionsInterface } from "../interfaces";

const urltoFile = (url: string, filename?: string, mimeType?: string) =>
  fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));

interface UserDataInterface {
  Uid: number;
  name: string;
  birthday: string;
  city: string;
  email: string;
  visited: Array<object>;
  planning: Array<object>;
  followers: number;
  about: string;
  avatar: string;
  events: string;
  message?: string;
}

export default class UserStore {
  public globalStore: any;

  public userData: UserDataInterface;

  public validationErrors: Array<String>;

  public currentTab: string;

  public currentEventsButton: string;

  public avatarPreviewUrl: string;

  public profilePlanningEvents: Array<object>;

  public profileVisitedEvents: Array<object>;

  public currentEventsPage: number;

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
      this.globalStore.eventBus.publish(ChannelNames.errorValidation);
    } else {
      const answer = await postRegistrationData(action.data);

      if (answer.ok) {
        this.userData = await getLoggedProfileData();
        this.globalStore.eventBus.publish(ChannelNames.registerSuccessfull);
      } else {
        this.validationErrors.push("loginExist");
        this.globalStore.eventBus.publish(ChannelNames.errorValidation);
      }
    }
  }

  async login(action: ActionsInterface) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(ChannelNames.errorValidation);
    } else {
      const answer = await postLoginData(action.data);

      if (answer.ok) {
        this.userData = await getLoggedProfileData();
        this.globalStore.eventBus.publish(ChannelNames.registerSuccessfull);
      } else {
        this.validationErrors.push("wrongLoginOrPass");
        this.globalStore.eventBus.publish(ChannelNames.errorValidation);
      }
    }
  }

  async update(action: ActionsInterface) {
    //прочекать еще раз
    this.userData = await getLoggedProfileData();

    this.currentTab = profileTab.events;

    // const queryParamTab = this.globalStore.routerStore.currentUrl?.searchParams.get(  //вариант Димы
    //   "tab"
    // );
    // if (queryParamTab) {
    //   this.currentTab = queryParamTab;
    // }

    this.currentEventsButton = profileEventsButton.planning;

    if (this.userData.message === "user is not authorized") {
      this.userData = null;

      if (action?.data) {
        this.globalStore.eventBus.publish(ChannelNames.firstUserIsNotAuth);
      }
      this.globalStore.eventBus.publish(ChannelNames.userIsNotAuth);
    } else {
      if (action?.data) {
        this.globalStore.eventBus.publish(ChannelNames.firstUserUpdated);
      }
      this.globalStore.eventBus.publish(ChannelNames.userUpdated);
    }
  }

  async logout() {
    this.userData = null; //у меня был = {} - прочекать
    await logoutFunc();
    this.globalStore.eventBus.publish(ChannelNames.logoutSuccessfull);
  }

  async changeTab(action: ActionsInterface) {
    //прочекать еще раз
    history.pushState(
      { page: "/profile", parameter: action.data },
      null,
      `profile?tab=${action.data}`
    );
    this.currentTab = <string>(<unknown>action.data);
    this.globalStore.eventBus.publish(ChannelNames.tabChanged);
  }

  async changeEventsButton(action: ActionsInterface) {
    //добавлена мной
    this.currentEventsButton = action.data;
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(
          ChannelNames.userEventsButtonChanged,
          this.profilePlanningEvents
        );
        break;
      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(
          ChannelNames.userEventsButtonChanged,
          this.profileVisitedEvents
        );
        break;
    }
  }

  async updateEvents() {
    //добавлена мной
    this.profilePlanningEvents.length = 0;
    this.profileVisitedEvents.length = 0;

    for (const event of this.userData.planning) {
      this.profilePlanningEvents.push(event);
    }
    for (const event of this.userData.visited) {
      this.profileVisitedEvents.push(event);
    }
  }

  async postProfileForm(action: ActionsInterface) {
    this.validationErrors = validation(action.data);

    if (this.validationErrors.length) {
      this.globalStore.eventBus.publish(ChannelNames.errorValidation);
      return;
    }

    const answer = await postProfileData(action.data);

    if (answer.ok) {
      await this.update(null);
    } else {
      this.validationErrors.push("emailExist");
      this.globalStore.eventBus.publish(ChannelNames.errorValidation);
    }
  }

  avatarPreview(action: ActionsInterface) {
    this.avatarPreviewUrl = <string>(<unknown>action.data);
    this.globalStore.eventBus.publish(ChannelNames.avatarPreview);
  }

  async avatarPush() {
    const fileAvatar = await urltoFile(this.avatarPreviewUrl);
    const formPut = new FormData();
    formPut.append("avatar", fileAvatar);

    await putAvatar(formPut);
    this.globalStore.eventBus.publish(ChannelNames.avatarPushed);
  }

  async avatarDecline() {
    this.avatarPreviewUrl = null;
    this.globalStore.eventBus.publish(ChannelNames.avatarDeclined);
  }

  async pageForward() {
    //добавлена мной
    this.currentEventsPage++;
    await this.updateEvents();

    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(
          ChannelNames.profilePageChanged,
          this.profilePlanningEvents
        );
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(
          ChannelNames.profilePageChanged,
          this.profileVisitedEvents
        );
        break;
    }
  }

  async pageBack() {
    //добавлена мной
    this.currentEventsPage--;
    await this.updateEvents();

    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(
          ChannelNames.profilePageChanged,
          this.profilePlanningEvents
        );
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(
          ChannelNames.profilePageChanged,
          this.profileVisitedEvents
        );
        break;
    }
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case "user/register":
        this.register(action);
        break;

      case "user/login":
        this.login(action);
        break;

      case "user/update":
        this.update(action);
        break;

      case "user/logout":
        this.logout();
        break;

      case "user/changeTab":
        this.changeTab(action);
        break;

      case "user/postProfileForm":
        this.postProfileForm(action);
        break;

      case "user/avatarPreview":
        this.avatarPreview(action);
        break;

      case "user/avatarPush":
        this.avatarPush();
        break;

      case "user/avatarDecline":
        this.avatarDecline();
        break;

      case "user/changeEventsButton":
        this.changeEventsButton(action);
        break;

      case "user/updateEvents":
        // this.updateEvents(action); //у меня было так, хз почему работало(мб мерж?)
        this.updateEvents();
        break;

      case "user/pageForward":
        this.pageForward();
        break;

      case "user/pageBack":
        this.pageBack();
        break;

      default:
        break;
    }
  }
}
