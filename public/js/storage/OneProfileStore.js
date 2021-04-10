import {getProfileById, getEventById} from '../networkModule/network.js';

import {channelNames, profileEventsButton, profileTab} from '../config/config.js';

const oneProfileDataSymbol = Symbol('oneProfileData');
const currentEventsButtonSymbol = Symbol('CurrentEventsButtonSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');
const oneProfileEventsSymbol = Symbol('oneProfileEventsSymbol');

export default class oneProfileStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[oneProfileDataSymbol] = null;
    this[currentEventsButtonSymbol] = profileEventsButton.planning;
    this[oneProfileEventsSymbol] = [];
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

  get oneProfileEvents() {
    return this[oneProfileEventsSymbol];
  }

  async update(action) {
    this[oneProfileDataSymbol] = await getProfileById(action.data);
    this[currentEventsButtonSymbol] = profileEventsButton.planning;
    await this.updateEvents();
    this.globalStore.eventBus.publish(channelNames.oneProfileUpdated);
  }

  async changeEventsButton(action) {
    this[currentEventsButtonSymbol] = action.data;
    this.globalStore.eventBus.publish(
      channelNames.oneProfileEventsButtonChanged,
      this.currentEventsButton === 'planningEventsButton' ? this.oneProfileEvents : []
    );
  }

  async updateEvents() {
    this.oneProfileEvents.length = 0;

    if (this.oneProfileData.events !== null) {
      for (const event of this.oneProfileData.events) {
        const eventJson = await getEventById(event);
        this.oneProfileEvents.push(eventJson);
      }
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

      default:
        break;
    }
  }
}
