import { getUsersByParams } from '../networkModule/network';

import { ChannelNames, followingsTab } from '../config/config';

import { ActionsInterface } from '../interfaces';

export default class SearchStore {
  public globalStore: any;

  public currentTab: string;

  public followedUsers: Array<any>; // те, на кого подписан

  public followers: Array<any>; // подписчики

  public currentFollowedUsersPage: number;

  public currentFollowersPage: number;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.currentTab = followingsTab.followedUsers;
    this.followedUsers = [];
    this.followers = [];
    this.currentFollowedUsersPage = 1; // подписки
    this.currentFollowersPage = 1; // подписчики
  }

  async update() {
    // брать данные из урла:
    const { currentUrl } = this.globalStore.routerStore;

    this.currentTab = currentUrl.searchParams.get('tab')
      ? currentUrl.searchParams.get('tab')
      : followingsTab.followedUsers;

    switch (this.currentTab) {
      case followingsTab.followedUsers:
        this.currentFollowedUsersPage = currentUrl.searchParams.get('page')
          ? currentUrl.searchParams.get('page')
          : 1;
        this.currentFollowersPage = 1;
        break;
      case followingsTab.followers:
        this.currentFollowersPage = currentUrl.searchParams.get('page') ? currentUrl.searchParams.get('page') : 1;
        this.currentFollowedUsersPage = 1;
        break;
    }

    await this.updateResults();
    this.globalStore.eventBus.publish(ChannelNames.followingsPageUpdated);
  }

  async updateByHistory() {
    // Брать данные из истории
    const params = history.state.parameter;

    const urlParams = new URLSearchParams(params);

    this.currentTab = urlParams.get('tab') ? urlParams.get('tab') : followingsTab.followedUsers;

    switch (this.currentTab) {
      case followingsTab.followedUsers:
        this.currentFollowedUsersPage = urlParams.get('page') ? <number>(<unknown>urlParams.get('page')) : 1;
        break;
      case followingsTab.followers:
        this.currentFollowersPage = urlParams.get('page') ? <number>(<unknown>urlParams.get('page')) : 1;
        break;
    }

    await this.updateResultsByHistory();
    this.globalStore.eventBus.publish(ChannelNames.followingsPageUpdated);
  }

  async changeTab(action: ActionsInterface) {
    this.currentTab = action.data;

    let curTabPage;
    switch (this.currentTab) {
      case followingsTab.followedUsers:
        curTabPage = this.currentFollowedUsersPage;
        break;
      case followingsTab.followers:
        curTabPage = this.currentFollowersPage;
        break;
    }
    const params = [
      ['tab', this.currentTab],
      ['page', curTabPage.toString()],
    ];

    const urlParams = new URLSearchParams(params).toString();

    history.pushState({ page: '/followings', parameter: params }, null, `followings?${urlParams}`);

    this.globalStore.eventBus.publish(ChannelNames.followingsTabChanged);
  }

  async updateResults() {
    this.followedUsers.length = 0;
    this.followers.length = 0;

    const followedUsersJsonArray: Array<object> = await getUsersByParams();
    if (followedUsersJsonArray !== null) {
      Object.entries(followedUsersJsonArray).forEach(([, userJson]) => {
        this.followedUsers.push(userJson);
      });
    }

    const followersJsonArray: Array<object> = await getUsersByParams();
    if (followersJsonArray !== null) {
      Object.entries(followersJsonArray).forEach(([, userJson]) => {
        this.followers.push(userJson);
      });
    }

    let curTabPage;
    switch (this.currentTab) {
      case followingsTab.followedUsers:
        curTabPage = this.currentFollowedUsersPage;
        break;
      case followingsTab.followers:
        curTabPage = this.currentFollowersPage;
        break;
    }
    const params = [
      ['tab', this.currentTab],
      ['page', curTabPage.toString()],
    ];

    const urlParams = new URLSearchParams(params).toString();

    history.pushState({ page: '/followings', parameter: params }, null, `followings?${urlParams}`);
  }

  async updateResultsByHistory() {
    // тот же updateResults, но без пуша стейта истории
    this.followedUsers.length = 0;
    this.followers.length = 0;

    const followedUsersJsonArray: Array<object> = await getUsersByParams();
    if (followedUsersJsonArray !== null) {
      Object.entries(followedUsersJsonArray).forEach(([, userJson]) => {
        this.followedUsers.push(userJson);
      });
    }

    const followersJsonArray: Array<object> = await getUsersByParams();
    if (followersJsonArray !== null) {
      Object.entries(followersJsonArray).forEach(([, userJson]) => {
        this.followers.push(userJson);
      });
    }
  }

  async pageForward() {
    switch (this.currentTab) {
      case followingsTab.followedUsers:
        this.currentFollowedUsersPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.followingsPageChanged);
        break;

      case followingsTab.followers:
        this.currentFollowersPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.followingsPageChanged);
        break;
    }
  }

  async pageBack() {
    switch (this.currentTab) {
      case followingsTab.followedUsers:
        this.currentFollowedUsersPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.followingsPageChanged);
        break;

      case followingsTab.followers:
        this.currentFollowersPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.followingsPageChanged);
        break;
    }
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {

      case 'followings/changeTab':
        this.changeTab(action);
        break;

      case 'followings/update':
        this.update();
        break;

      case 'followings/pageForward':
        this.pageForward();
        break;

      case 'followings/pageBack':
        this.pageBack();
        break;

      case 'followings/updateByHistory':
        this.updateByHistory();
        break;

      default:
        break;
    }
  }
}
