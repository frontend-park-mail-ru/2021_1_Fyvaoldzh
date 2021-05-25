import {
  postRegistrationData,
  getLoggedProfileData,
  postLoginData,
  logoutFunc,
  postProfileData,
  putAvatar,
  getPlanningEventsById,
  getVisitedEventsById,
  followUser,
  unfollowUser,
  getFollowersById,
  getFollowedUsersById,
  getNotifications,
  getCounts,
} from '../networkModule/network';

import { ChannelNames, profileTab, profileEventsButton } from '../config/config';
import validation from '../validationModule/inputValidation';
import { ActionsInterface } from '../interfaces';
import { NotificationInterface } from '../interfaces/UserInterfaces';
import { addDeclensionOfNumbers } from '../views/utils/utils';

const urltoFile = (url: string, filename?: string, mimeType?: string) => fetch(url)
  .then((res) => res.arrayBuffer())
  .then((buf) => new File([buf], filename, { type: mimeType }));

const timeAgo = (date: string) => {
  const currentDate = new Date();
  const sendDate = new Date(date);

  const diffDate = currentDate.getTime() - sendDate.getTime();

  const minutes = diffDate / 60000;
  const hours = minutes / 60;
  const days = hours / 24;

  if (Math.trunc(days) === 0) {
    if (Math.trunc(hours) === 0) {
      if (Math.trunc(minutes) === 0) {
        return `${addDeclensionOfNumbers(1, ['минута', 'минуты', 'минут'])} назад`;
      }
      return `${addDeclensionOfNumbers(Math.trunc(minutes), ['минута', 'минуты', 'минут'])} назад`;
    }
    return `${addDeclensionOfNumbers(Math.trunc(hours), ['часов', 'часа', 'часов'])} назад`;
  }
  return `${addDeclensionOfNumbers(Math.trunc(days), ['день', 'дня', 'дней'])} назад`;
}

interface UserDataInterface {
  Uid: number;
  name: string;
  birthday: string;
  city: string;
  email: string;
  visited: any;
  planning: any;
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

  public avatarPreviewUrl: string;

  public currentEventsButton: any;

  public profilePlanningEvents: any;

  public profileVisitedEvents: any;

  public currentEventsPage: any;

  public followedUsers: Array<any>; // подписки

  public followers: Array<any>; // подписчики

  public geolocation: [number, number];

  public notifications: Array<NotificationInterface>;

  public notificationsCount: number;

  public chatCount: number;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.userData = null;
    this.validationErrors = [];
    this.avatarPreviewUrl = null;

    this.currentTab = profileTab.events;
    this.currentEventsButton = profileEventsButton.planning;
    this.avatarPreviewUrl = null;
    this.profilePlanningEvents = [];
    this.profileVisitedEvents = [];
    this.currentEventsPage = 1;
    this.followedUsers = [];
    this.followers = [];
    this.geolocation = null;
    this.chatCount = 0;
    this.notificationsCount = 0;
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
        this.validationErrors.push('loginExist');
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
        this.validationErrors.push('wrongLoginOrPass');
        this.globalStore.eventBus.publish(ChannelNames.errorValidation);
      }
    }
  }

  async update(action: ActionsInterface) {
    this.userData = await getLoggedProfileData();

    // this.followers = await getFollowersById(this.userData.Uid);
    //
    // this.followedUsers = await getFollowedUsersById(this.userData.Uid);
    // if (this.followedUsers === null) this.followedUsers = [];

    this.followers = [];
    this.followedUsers = [];

    const followersJson = await getFollowersById(this.userData.Uid);

    if (followersJson !== null) {
      Object.entries(followersJson).forEach(([, followerJson]) => {
        // @ts-ignore
        this.followers.push(followerJson);
      });
    }

    const followedUsersJson = await getFollowedUsersById(this.userData.Uid);

    if (followedUsersJson !== null) {
      Object.entries(followedUsersJson).forEach(([, followedUserJson]) => {
        // @ts-ignore
        this.followedUsers.push(followedUserJson);
      });
    }

    const queryParamTab = this.globalStore.routerStore.currentUrl?.searchParams.get('tab');
    if (queryParamTab) {
      this.currentTab = queryParamTab;
    }

    if (this.userData.message === 'user is not authorized') {
      this.userData = null;

      if (action?.data) {
        this.globalStore.eventBus.publish(ChannelNames.firstUserIsNotAuth);
      }
      this.globalStore.eventBus.publish(ChannelNames.userIsNotAuth);
    } else {
      await this.updateEvents(); // тут норм?
      // ============================ подтягивание фолловеров и подписок
      const followersJson = await getFollowersById(this.userData.Uid);

      if (followersJson !== null) {
        Object.entries(followersJson).forEach(([, followerJson]) => {
          // @ts-ignore
          this.followers.push(followerJson);
        });
      }

      const followedUsersJson = await getFollowedUsersById(this.userData.Uid);

      if (followedUsersJson !== null) {
        Object.entries(followedUsersJson).forEach(([, followedUserJson]) => {
          // @ts-ignore
          this.followedUsers.push(followedUserJson);
        });
      }
      // ============================
      if (action?.data) {
        this.globalStore.eventBus.publish(ChannelNames.firstUserUpdated);
      }
      this.globalStore.eventBus.publish(ChannelNames.userUpdated);
    }
  }

  async logout() {
    this.userData = null;
    await logoutFunc();
    this.globalStore.eventBus.publish(ChannelNames.logoutSuccessfull);
  }

  async changeTab(action: ActionsInterface) {
    this.globalStore.routerStore.currentUrl.searchParams.set('tab', action.data);
    history.pushState({ page: '/profile', parameter: action.data }, null, `profile?tab=${action.data}`);
    this.currentTab = <string>(<unknown>action.data);
    this.globalStore.eventBus.publish(ChannelNames.tabChanged);
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
      this.validationErrors.push('emailExist');
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
    formPut.append('avatar', fileAvatar);

    await putAvatar(formPut);
    this.globalStore.eventBus.publish(ChannelNames.avatarPushed);
  }

  async avatarDecline() {
    this.avatarPreviewUrl = null;
    this.globalStore.eventBus.publish(ChannelNames.avatarDeclined);
  }

  async changeEventsButton(action: ActionsInterface) {
    this.currentEventsButton = action.data;
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(ChannelNames.userEventsButtonChanged);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(ChannelNames.userEventsButtonChanged);
        break;

      default:
        break;
    }
  }

  async updateEvents() {
    this.profilePlanningEvents.length = 0;
    this.profileVisitedEvents.length = 0;

    const planningJson = await getPlanningEventsById(this.userData.Uid);

    if (planningJson !== null) {
      Object.entries(planningJson).forEach(([, eventJson]) => {
        this.profilePlanningEvents.push(eventJson);
      });
    }

    const visitedJson = await getVisitedEventsById(this.userData.Uid);

    if (visitedJson !== null) {
      Object.entries(visitedJson).forEach(([, eventJson]) => {
        this.profileVisitedEvents.push(eventJson);
      });
    }
  }

  async pageForward() {
    this.currentEventsPage++;
    await this.updateEvents();

    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(ChannelNames.profilePageChanged);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(ChannelNames.profilePageChanged);
        break;

      default:
        break;
    }
  }

  async pageBack() {
    this.currentEventsPage--;
    await this.updateEvents();

    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(ChannelNames.profilePageChanged);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(ChannelNames.profilePageChanged);
        break;

      default:
        break;
    }
  }

  async changePassword(action: ActionsInterface) {
    const answer = await postProfileData(action.data);

    if (answer.ok) {
      this.globalStore.eventBus.publish(ChannelNames.profilePasswordChanged);
    } else {
      this.validationErrors.push('wrongPassword');
      this.globalStore.eventBus.publish(ChannelNames.errorValidation);
    }
  }

  async subscribeToUser(action: ActionsInterface) {
    await followUser(action.data);
  }

  async unsubscribeFromUser(action: ActionsInterface) {
    await unfollowUser(action.data);
  }

  updateGeolocation(action: ActionsInterface) {
    this.geolocation = action.data;
  }

  async updateNotifications() {
    this.notifications = await getNotifications();

    this.notifications.forEach((val) => {
      switch (val.type) {
        case 'Mail':
          val.type = 'Вас пригласили';
          val.text = `${val.text} приглашает вас на мероприятие`;
          val.pathToImage = `https://qdaqda.ru/api/v1/avatar/${val.id_to_image}`;
          val.href = `/chat?c=${val.id}`;
          val.date = timeAgo(val.date);
          break;

        case 'Event':
          val.type = 'Скоро событие';
          val.pathToImage = `https://qdaqda.ru/api/v1/event/${val.id_to_image}/image`;
          val.text = `Мероприятие "${val.text}" начнется через 5 часов`;
          val.href = `/event${val.id}`;
          val.date = timeAgo(val.date);
          break;
      }

      if (val.read) {
        val.display = 'block';
      }

      if (!val.read) {
        val.display = 'none';
      }
    })

    this.globalStore.eventBus.publish(ChannelNames.notificationsUpdated);
  }

  async updateCounts() {
    const answer: CountInterface = await getCounts();

    this.notificationsCount = answer.notifications;
    this.chatCount = answer.chat;

    this.globalStore.eventBus.publish(ChannelNames.countsUpdated);
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

      case 'user/changeEventsButton':
        this.changeEventsButton(action);
        break;

      case 'user/updateEvents':
        this.updateEvents();
        break;

      case 'user/pageForward':
        this.pageForward();
        break;

      case 'user/pageBack':
        this.pageBack();
        break;

      case 'user/changePassword':
        this.changePassword(action);
        break;

      case 'user/subscribeToUser':
        this.subscribeToUser(action);
        break;

      case 'user/unsubscribeFromUser':
        this.unsubscribeFromUser(action);
        break;

      case 'user/updateGeolocation':
        this.updateGeolocation(action);
        break;

      case 'user/updateNotifications':
        this.updateNotifications();
        break;

      case 'user/updateCounts':
        this.updateCounts();
        break;

      default:
        break;
    }
  }
}

interface CountInterface {
  notifications: number;
  chat: number;
}
