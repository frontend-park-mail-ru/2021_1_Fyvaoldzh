import {
  getProfileById,
  getEventById,
  getEventsByParams,
  getUsersByParams,
  getAllEventsJson,
} from "../networkModule/network";

import { ChannelNames, searchButton, searchTab } from "../config/config";

import { ActionsInterface } from "../interfaces";

export default class SearchStore {
  public globalStore: any;

  public searchData: any;

  public currentEventsButton: string;

  public currentTab: string;

  public searchResultEvents: Array<object>;

  public searchResultUsers: Array<object>;

  public currentEventsPage: number;

  public currentUsersPage: number;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.searchData = "";
    this.currentEventsButton = searchButton.allEvents;
    this.currentTab = searchTab.events;
    this.searchResultEvents = [];
    this.searchResultUsers = [];
    this.currentEventsPage = 1;
    this.currentUsersPage = 1;
  }

  async update(action: ActionsInterface) {
    //брать данные из урла:
    const currentUrl = this.globalStore.routerStore.currentUrl;

    this.searchData = currentUrl.searchParams.get("text")
      ? currentUrl.searchParams.get("text")
      : "";

    this.currentEventsButton = currentUrl.searchParams.get("category")
      ? currentUrl.searchParams.get("category")
      : searchButton.allEvents;

    this.currentTab = currentUrl.searchParams.get("tab")
      ? currentUrl.searchParams.get("tab")
      : searchTab.events;

    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage = currentUrl.searchParams.get("page")
          ? currentUrl.searchParams.get("page")
          : 1;
        break;
      case searchTab.users:
        this.currentUsersPage = currentUrl.searchParams.get("page")
          ? currentUrl.searchParams.get("page")
          : 1;
        break;
    }

    await this.updateResults();
    this.globalStore.eventBus.publish(ChannelNames.searchUpdated);
  }

  async updateByHistory() {
    //Брать данные из истории
    const params = history.state.parameter;

    const search = new URLSearchParams(params);

    this.searchData = search.get("text") ? search.get("text") : "";

    this.currentEventsButton = search.get("category")
      ? search.get("category")
      : searchButton.allEvents;

    this.currentTab = search.get("tab") ? search.get("tab") : searchTab.events;

    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage = search.get("page")
          ? <number>(<unknown>search.get("page"))
          : 1;
        break;
      case searchTab.users:
        this.currentUsersPage = search.get("page")
          ? <number>(<unknown>search.get("page"))
          : 1;
        break;
    }

    await this.updateResultsByHistory();
    this.globalStore.eventBus.publish(ChannelNames.searchUpdated);
  }

  async changeEventsButton(action: ActionsInterface) {
    this.currentEventsPage = 1;
    this.currentEventsButton = action.data;
    await this.updateResults();
    this.globalStore.eventBus.publish(
      ChannelNames.searchEventsButtonChanged,
      this.searchResultEvents
    );
  }

  async changeTab(action: ActionsInterface) {
    this.currentTab = action.data;

    let curTabPage;
    switch (this.currentTab) {
      case searchTab.events:
        curTabPage = this.currentEventsPage;
        break;
      case searchTab.users:
        curTabPage = this.currentUsersPage;
        break;
    }
    const params = [
      ["text", this.searchData],
      ["tab", this.currentTab],
      ["category", this.currentEventsButton],
      ["page", curTabPage.toString()],
    ];

    const url = new URLSearchParams(params).toString();

    history.pushState(
      { page: "/search", parameter: params },
      null,
      "search?" + url
    );

    this.globalStore.eventBus.publish(ChannelNames.searchTabChanged);
  }

  async newInputData(action: ActionsInterface) {
    this.searchData = action.data;
    this.currentEventsPage = 1;
    this.currentUsersPage = 1;
    await this.updateResults();

    this.globalStore.eventBus.publish(ChannelNames.searchUpdated);
  }

  async updateResults() {
    this.searchResultEvents.length = 0;
    this.searchResultUsers.length = 0;

    const eventsJsonArray: Array<object> = await getEventsByParams(
      this.searchData,
      this.getCategoryCyrillic(this.currentEventsButton),
      this.currentEventsPage
    );
    if (eventsJsonArray !== null) {
      Object.entries(eventsJsonArray).forEach(([, eventJson]) => {
        this.searchResultEvents.push(eventJson);
      });
    }

    const usersJsonArray: Array<object> = await getUsersByParams(
      this.currentUsersPage
    );
    if (usersJsonArray !== null) {
      Object.entries(usersJsonArray).forEach(([, userJson]) => {
        this.searchResultUsers.push(userJson);
      });
    }

    let curTabPage;
    switch (this.currentTab) {
      case searchTab.events:
        curTabPage = this.currentEventsPage;
        break;
      case searchTab.users:
        curTabPage = this.currentUsersPage;
        break;
    }
    const params = [
      ["text", this.searchData],
      ["tab", this.currentTab],
      ["category", this.currentEventsButton],
      ["page", curTabPage.toString()],
    ];

    const url = new URLSearchParams(params).toString();

    history.pushState(
      { page: "/search", parameter: params },
      null,
      "search?" + url
    );
  }

  async updateResultsByHistory() {
    //тот же updateResults, но без пуша стейта истории
    this.searchResultEvents.length = 0;
    this.searchResultUsers.length = 0;

    const eventsJsonArray: Array<object> = await getEventsByParams(
      this.searchData,
      this.getCategoryCyrillic(this.currentEventsButton),
      this.currentEventsPage
    );
    if (eventsJsonArray !== null) {
      Object.entries(eventsJsonArray).forEach(([, eventJson]) => {
        this.searchResultEvents.push(eventJson);
      });
    }

    const usersJsonArray: Array<object> = await getUsersByParams(
      this.currentUsersPage
    );
    if (usersJsonArray !== null) {
      Object.entries(usersJsonArray).forEach(([, userJson]) => {
        this.searchResultUsers.push(userJson);
      });
    }
  }

  async pageForward() {
    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(
          ChannelNames.searchEventsPageChanged,
          this.searchResultEvents
        );
        break;

      case searchTab.users:
        this.currentUsersPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(
          ChannelNames.searchUsersPageChanged,
          this.searchResultUsers
        );

        break;
    }
  }

  async pageBack() {
    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(
          ChannelNames.searchEventsPageChanged,
          this.searchResultEvents
        );
        break;

      case searchTab.users:
        this.currentUsersPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(
          ChannelNames.searchUsersPageChanged,
          this.searchResultUsers
        );
        break;
    }
  }

  getCategoryCyrillic(categoryName: string) {
    switch (categoryName) {
      case searchButton.allEvents:
        return "";

      case searchButton.exhibition:
        return "Выставка";

      case searchButton.concert:
        return "Концерт";

      case searchButton.museum:
        return "Музей";

      case searchButton.entertainment:
        return "Развлечения";

      case searchButton.training:
        return "Обучение";

      case searchButton.movie:
        return "Кино";

      case searchButton.festival:
        return "Фестиваль";

      case searchButton.excursion:
        return "Экскурсия";
    }
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case "search/changeEventsButton":
        this.changeEventsButton(action);
        break;

      case "search/changeTab":
        this.changeTab(action);
        break;

      case "search/update":
        this.update(action);
        break;

      case "search/newInputData":
        this.newInputData(action);
        break;

      case "search/pageForward":
        this.pageForward();
        break;

      case "search/pageBack":
        this.pageBack();
        break;

      case "search/updateByHistory":
        this.updateByHistory();
        break;

      default:
        break;
    }
  }
}
