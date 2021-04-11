import { getEventById } from '../networkModule/network';
import { channelNames } from '../config/config';
import { ActionsInterface } from "../interfaces";

export default class OneEventStore {
  public globalStore: any;
  public oneEventData: object;

  constructor(globalStore: any) {
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
