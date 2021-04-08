import { channelNames } from '../config/config';
import {
  getProfileDataById,
} from '../networkModule/network';
import Store from "./store";
import {ActionsInterface} from "../actions/actions";

const someUserDataSymbol = Symbol('someUserDataSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class SomeUserStore {
  public globalStore: Store;
  public someUserData: object;

  constructor(globalStore: Store) {
    this.globalStore = globalStore;
    this.someUserData = null;
  }

  async update(action: ActionsInterface) {
    this.someUserData = await getProfileDataById(<Number>action.data);

    this.globalStore.eventBus.publish(channelNames.someUserUpdated);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'someUser/update':
        this.update(action);
        break;

      default:
        break;
    }
  }
}
