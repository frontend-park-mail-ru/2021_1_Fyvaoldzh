import { ActionsInterface } from '../interfaces';
import { ChannelNames } from '../config/config';
import { parseDate } from '../views/utils/utils';
import { getActivity } from '../networkModule/network';

interface UserEventInterface {
  id_1: number;
  name_1: string;
  id_2: number;
  name_2: string;
  time: string;
  type: string;
}

export default class ActivityStore {
  public globalStore: any;

  public activityArray: Array<UserEventInterface>;

  public currentPage: number;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.activityArray = [];
    this.currentPage = 1;
  }

  async update() {
    this.activityArray = await getActivity(this.currentPage);
    console.log(this.activityArray);
    this.activityArray?.forEach((val) => val.time = parseDate(val.time));
    this.globalStore.eventBus.publish(ChannelNames.activityUpdated);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'activity/update':
        this.update();
        break;

      default:
        break;
    }
  }
}