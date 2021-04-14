import {getProfileById, getEventById} from '../networkModule/network.js';

import {channelNames, profileEventsButton, profileTab, searchTab} from '../config/config.js';

const oneProfileDataSymbol = Symbol('oneProfileData');
const currentEventsButtonSymbol = Symbol('CurrentEventsButtonSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');
const oneProfilePlanningEventsSymbol = Symbol('oneProfilePlanningEventsSymbol');
const oneProfileVisitedEventsSymbol = Symbol('oneProfileVisitedEventsSymbol');
const currentEventsPageSymbol = Symbol('currentEventsPageSymbol');

export default class oneProfileStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[oneProfileDataSymbol] = null;
    this[currentEventsButtonSymbol] = profileEventsButton.planning;
    this[oneProfilePlanningEventsSymbol] = [];
    this[oneProfileVisitedEventsSymbol] = [];
    this[currentEventsPageSymbol] = 1;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get oneProfileData() {
    return this[oneProfileDataSymbol];
  }

  get currentEventsButton() {
    return this[currentEventsButtonSymbol];
  }

  get oneProfilePlanningEvents() {
    return this[oneProfilePlanningEventsSymbol];
  }

  get oneProfileVisitedEvents() {
    return this[oneProfileVisitedEventsSymbol];
  }

  get currentEventsPage() {
    return this[currentEventsPageSymbol];
  }

  set currentEventsPage(value) {
    this[currentEventsPageSymbol] = value;
  }

  async update(action) {
    this[currentEventsPageSymbol] = 1;
    this[oneProfileDataSymbol] = await getProfileById(action.data);
    this[currentEventsButtonSymbol] = profileEventsButton.planning;
    await this.updateEvents();
    this.globalStore.eventBus.publish(channelNames.oneProfileUpdated);
  }

  async changeEventsButton(action) {
    this[currentEventsPageSymbol] = 1;
    this[currentEventsButtonSymbol] = action.data;
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(
          channelNames.oneProfileEventsButtonChanged,
          this.oneProfilePlanningEvents
        );
        break;
      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(
          channelNames.oneProfileEventsButtonChanged,
          this.oneProfileVisitedEvents
        );
        break;
    }
  }

  async updateEvents() {
    this.oneProfilePlanningEvents.length = 0;
    this.oneProfileVisitedEvents.length = 0;

    if (this.oneProfileData.planning !== null) {
      for (const event of this.oneProfileData.planning) {
        this.oneProfilePlanningEvents.push(event);
      }
    }

    if (this.oneProfileData.visited !== null) {
      for (const event of this.oneProfileData.visited) {
        this.oneProfileVisitedEvents.push(event);
      }
    }
  }

  async pageForward() {
    this.currentEventsPage++;
    await this.updateEvents();
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(channelNames.oneProfilePageChanged, this.oneProfilePlanningEvents);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(channelNames.oneProfilePageChanged, this.oneProfileVisitedEvents);
        break;
    }
  }

  async pageBack() {
    this.currentEventsPage--;
    await this.updateEvents();

    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(channelNames.oneProfilePageChanged, this.oneProfilePlanningEvents);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(channelNames.oneProfilePageChanged, this.oneProfileVisitedEvents);
        break;
    }
  }

  reducer(action) {
    switch (action.eventName) {
      case 'oneProfile/changeEventsButton':
        this.changeEventsButton(action);
        break;

      case 'oneProfile/update':
        this.update(action);
        break;

      case 'oneProfile/updateEvents':
        this.updateEvents(action);
        break;

      case 'oneProfile/pageForward':
        this.pageForward();
        break;

      case 'oneProfile/pageBack':
        this.pageBack();
        break;

      default:
        break;
    }
  }
}
