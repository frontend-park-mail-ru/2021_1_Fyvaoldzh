import {getProfileById, getEventById} from '../networkModule/network.js';

import {channelNames, searchButton, searchTab} from '../config/config.js';

const searchDataSymbol = Symbol('SearchDataSymbol');
const currentEventsButtonSymbol = Symbol('CurrentEventsButtonSymbol');
const currentTabSymbol = Symbol('CurrentTabSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');
const searchResultEventsSymbol = Symbol('searchResultEventsSymbol');
const searchResultUsersSymbol = Symbol('searchResultUsersSymbol');

export default class searchStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[searchDataSymbol] = '';
    this[currentEventsButtonSymbol] = searchButton.exhibition;
    this[currentTabSymbol] = searchTab.events;
    this[searchResultEventsSymbol] = [];
    this[searchResultUsersSymbol] = [];
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

  async update(action) {
    // this[searchDataSymbol] = action.data;
    this[currentEventsButtonSymbol] = searchButton.exhibition;
    this[currentTabSymbol] = searchTab.events;
    await this.updateResults();
    this.globalStore.eventBus.publish(channelNames.searchUpdated);
  }

  async changeEventsButton(action) {
    this[currentEventsButtonSymbol] = action.data;
    this.globalStore.eventBus.publish(
      channelNames.searchEventsButtonChanged,
      this.currentEventsButton === 'exhibitionButton' ? this.searchResultEvents : []
    );
  }

  async changeTab(action) {
    this[currentTabSymbol] = action.data;
    if (this[currentTabSymbol] === searchTab.events) {
      this[currentEventsButtonSymbol] = searchButton.exhibition;
    }
    this.globalStore.eventBus.publish(channelNames.searchTabChanged);
  }

  async updateResults() {
    this.searchResultEvents.length = 0;
    this.searchResultUsers.length = 0;

    for (let i = 124; i < 129; ++i) {
      const eventJson = await getEventById(i);
      if (eventJson.title && eventJson.title.includes(this.searchData)) {
        this.searchResultEvents.push(eventJson);
      }
    }

    for (let i = 1; i < 63; ++i) {
      const userJson = await getProfileById(i);
      this.searchResultUsers.push(userJson);
    }
    // this.globalStore.eventBus.publish(channelNames.searchUpdated);
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

      case 'search/updateResults':
        this.updateResults(action);
        break;

      default:
        break;
    }
  }
}
