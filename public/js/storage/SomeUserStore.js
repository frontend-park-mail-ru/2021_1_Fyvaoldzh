import { channelNames } from '../config/config.js';
import {
  getProfileDataById,
} from '../networkModule/network.js';

const someUserDataSymbol = Symbol('someUserDataSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class SomeUserStore {
  constructor(globalStore) {
    this[globalStoreSymbol] = globalStore;
    this[someUserDataSymbol] = null;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get someUserData() {
    return this[someUserDataSymbol];
  }

  async update(action) {
    this[someUserDataSymbol] = await getProfileDataById(action.data);

    this.globalStore.eventBus.publish(channelNames.someUserUpdated);
  }

  reducer(action) {
    switch (action.eventName) {
      case 'someUser/update':
        this.update(action);
        break;

      default:
        break;
    }
  }
}
