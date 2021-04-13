import { ChannelNames } from '../config/config';
import {
  getProfileDataById,
} from '../networkModule/network';
import { ActionsInterface } from '../interfaces';

export default class SomeUserStore {
  public globalStore: any;

  public someUserData: object;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.someUserData = null;
  }

  async update(action: ActionsInterface) {
    this.someUserData = await getProfileDataById(<number>action.data);

    this.globalStore.eventBus.publish(ChannelNames.someUserUpdated);
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
