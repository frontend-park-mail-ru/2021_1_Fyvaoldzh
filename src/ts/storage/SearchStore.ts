import {
  getEventsByParams,
  getUsersByParams,
} from '../networkModule/network';

import { ChannelNames, searchButton, searchTab } from '../config/config';
import { ActionsInterface } from '../interfaces';

export default class SearchStore {
  public globalStore: any;

  public searchData: any;

  public currentEventsButton: any;

  public currentTab: any;

  public searchResultEvents: any;

  public searchResultUsers: any;

  public currentEventsPage: any;

  public currentUsersPage: any;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.searchData = '';
    this.currentEventsButton = searchButton.allEvents;
    this.currentTab = searchTab.events;
    this.searchResultEvents = [];
    this.searchResultUsers = [];
    this.currentEventsPage = 1;
    this.currentUsersPage = 1;
  }

  async update(action: ActionsInterface) {
    this.searchData = action.data;
    this.currentEventsButton = searchButton.allEvents;
    this.currentTab = searchTab.events;
    this.currentEventsPage = 1;
    this.currentUsersPage = 1;
    // this[currentEventsButtonSymbol] = searchButton.allEvents;
    // this[currentTabSymbol] = searchTab.events;
    await this.updateResults();

    this.globalStore.eventBus.publish(ChannelNames.searchUpdated);
  }

  async changeEventsButton(action: ActionsInterface) {
    this.currentEventsPage = 1;
    this.currentEventsButton = action.data;
    await this.updateResults();
    this.globalStore.eventBus.publish(ChannelNames.searchEventsButtonChanged, this.searchResultEvents);
  }

  async changeTab(action: ActionsInterface) {
    this.currentTab = action.data;
    // await this.updateResults(); //нужно ли...
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

    const eventsJsonArray = await getEventsByParams(
      this.searchData,
      this.getCategoryCyrillic(this.currentEventsButton),
      this.currentEventsPage,
    );
    if (eventsJsonArray !== null) {
      Object.entries(eventsJsonArray).forEach(([, eventJson]) => {
        this.searchResultEvents.push(eventJson);
      });
    }

    const usersJsonArray = await getUsersByParams(this.currentUsersPage);
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
        this.globalStore.eventBus.publish(ChannelNames.searchEventsPageChanged, this.searchResultEvents);
        break;

      case searchTab.users:
        this.currentUsersPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.searchUsersPageChanged, this.searchResultUsers);
        break;

      default:
        break;
    }
  }

  async pageBack() {
    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.searchEventsPageChanged, this.searchResultEvents);
        break;

      case searchTab.users:
        this.currentUsersPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(ChannelNames.searchUsersPageChanged, this.searchResultUsers);
        break;

      default:
        break;
    }
  }

  getCategoryCyrillic(categoryName: string) {
    switch (categoryName) {
      case searchButton.allEvents:
        return '';

      case searchButton.exhibition:
        return 'Выставка';

      case searchButton.concert:
        return 'Концерт';

      case searchButton.museum:
        return 'Музей';

      case searchButton.entertainment:
        return 'Развлечения';

      case searchButton.training:
        return 'Обучение';

      case searchButton.movie:
        return 'Кино';

      case searchButton.festival:
        return 'Фестиваль';

      case searchButton.excursion:
        return 'Экскурсия';

      default:
        break;
    }
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'search/changeEventsButton':
        this.changeEventsButton(action);
        break;

      case 'search/changeTab':
        this.changeTab(action);
        break;

      case 'search/update':
        this.update(action);
        break;

      case 'search/newInputData':
        this.newInputData(action);
        break;

      case 'search/pageForward':
        this.pageForward();
        break;

      case 'search/pageBack':
        this.pageBack();
        break;

      default:
        break;
    }
  }
}
