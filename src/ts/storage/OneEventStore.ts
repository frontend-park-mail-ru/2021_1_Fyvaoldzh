import { getEventById } from '../networkModule/network';
import { channelNames } from '../config/config';
import Store from "./store";
import {ActionsInterface} from "../actions/actions";

const oneEventDataSymbol = Symbol('oneEventDataSymbol');
const globalStoreSymbol = Symbol('globalStoreSymbol');

export default class OneEventStore {
  public globalStore: Store;
  public oneEventData: object;

  constructor(globalStore: Store) {
    this.globalStore = globalStore;
    this.oneEventData = null;
  }

  async update(action: ActionsInterface) {
    this.oneEventData = await getEventById(<number><unknown>action.data);
    this.globalStore.eventBus.publish(channelNames.eventCome);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'oneEvent/update':
        this.update(action);
        break;

      default:
        break;
    }
  }
}
