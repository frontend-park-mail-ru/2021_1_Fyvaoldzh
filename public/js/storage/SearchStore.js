import {
  getProfileById,
  getEventById,
  getEventsByParams,
  getUsersByParams,
  getAllEventsJson,
} from '../networkModule/network.js';

import {channelNames, searchButton, searchTab} from '../config/config.js';

const searchDataSymbol = Symbol('SearchDataSymbol');
const currentEventsButtonSymbol = Symbol('CurrentEventsButtonSymbol');
const currentTabSymbol = Symbol('CurrentTabSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');
const searchResultEventsSymbol = Symbol('searchResultEventsSymbol');
const searchResultUsersSymbol = Symbol('searchResultUsersSymbol');
const currentEventsPageSymbol = Symbol('currentEventsPageSymbol');
const currentUsersPageSymbol = Symbol('currentUsersPageSymbol');

export default class searchStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[searchDataSymbol] = '';
    this[currentEventsButtonSymbol] = searchButton.allEvents;
    this[currentTabSymbol] = searchTab.events;
    this[searchResultEventsSymbol] = [];
    this[searchResultUsersSymbol] = [];
    this[currentEventsPageSymbol] = 1;
    this[currentUsersPageSymbol] = 1;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get searchData() {
    return this[searchDataSymbol];
  }

  set searchData(value) {
    this[searchDataSymbol] = value;
  }

  get currentEventsButton() {
    return this[currentEventsButtonSymbol];
  }

  get currentTab() {
    return this[currentTabSymbol];
  }

  get searchResultEvents() {
    return this[searchResultEventsSymbol];
  }

  get searchResultUsers() {
    return this[searchResultUsersSymbol];
  }

  get currentEventsPage() {
    return this[currentEventsPageSymbol];
  }

  set currentEventsPage(value) {
    this[currentEventsPageSymbol] = value;
  }

  get currentUsersPage() {
    return this[currentUsersPageSymbol];
  }

  set currentUsersPage(value) {
    this[currentUsersPageSymbol] = value;
  }

  async update(action) {
    this[searchDataSymbol] = action.data;
    this[currentEventsButtonSymbol] = searchButton.allEvents;
    this[currentTabSymbol] = searchTab.events;
    this[currentEventsPageSymbol] = 1;
    this[currentUsersPageSymbol] = 1;
    // this[currentEventsButtonSymbol] = searchButton.allEvents;
    // this[currentTabSymbol] = searchTab.events;
    await this.updateResults();

    this.globalStore.eventBus.publish(channelNames.searchUpdated);
  }

  async changeEventsButton(action) {
    this[currentEventsPageSymbol] = 1;
    this[currentEventsButtonSymbol] = action.data;
    await this.updateResults();
    this.globalStore.eventBus.publish(channelNames.searchEventsButtonChanged, this.searchResultEvents);
  }

  async changeTab(action) {
    this[currentTabSymbol] = action.data;
    // await this.updateResults(); //нужно ли...
    this.globalStore.eventBus.publish(channelNames.searchTabChanged);
  }

  async newInputData(action) {
    this.searchData = action.data;
    this[currentEventsPageSymbol] = 1;
    this[currentUsersPageSymbol] = 1;
    await this.updateResults();
    this.globalStore.eventBus.publish(channelNames.searchUpdated);
  }

  async updateResults() {
    this.searchResultEvents.length = 0;
    this.searchResultUsers.length = 0;

    // const eventsJsonArray = await getAllEventsJson();
    // Object.entries(eventsJsonArray).forEach(([, eventJson]) => {
    //   this.searchResultEvents.push(eventJson);
    // });

    const eventsJsonArray = await getEventsByParams(
      this.searchData,
      this.getCategoryCyrillic(this.currentEventsButton),
      this.currentEventsPage
    );
    if (eventsJsonArray !== null) {
      Object.entries(eventsJsonArray).forEach(([, eventJson]) => {
        this.searchResultEvents.push(eventJson);
      });
    }
    // for (let i = 1; i < 63; ++i) {
    //   const userJson = await getProfileById(i);
    //   if (userJson.name && userJson.name.toUpperCase().includes(this.searchData.toUpperCase())) {
    //     this.searchResultUsers.push(userJson);
    //   }
    // }

    const usersJsonArray = await getUsersByParams(this.currentUsersPage);
    if (usersJsonArray !== null) {
      Object.entries(usersJsonArray).forEach(([, userJson]) => {
        this.searchResultUsers.push(userJson);
      });
    }
    // this.globalStore.eventBus.publish(channelNames.searchUpdated);
  }

  async pageForward() {
    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(channelNames.searchEventsPageChanged, this.searchResultEvents);
        break;

      case searchTab.users:
        this.currentUsersPage++;
        await this.updateResults();
        this.globalStore.eventBus.publish(channelNames.searchUsersPageChanged, this.searchResultUsers);

        break;
    }
  }

  async pageBack() {
    switch (this.currentTab) {
      case searchTab.events:
        this.currentEventsPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(channelNames.searchEventsPageChanged, this.searchResultEvents);
        break;

      case searchTab.users:
        this.currentUsersPage--;
        await this.updateResults();
        this.globalStore.eventBus.publish(channelNames.searchUsersPageChanged, this.searchResultUsers);
        break;
    }
  }

  getCategoryCyrillic(categoryName) {
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
    }
  }

  reducer(action) {
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
