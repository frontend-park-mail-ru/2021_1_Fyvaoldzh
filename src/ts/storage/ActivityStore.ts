import { ActionsInterface } from '../interfaces';
import { ChannelNames } from '../config/config';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;
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

  async update(renderOnlyMessages?: boolean) {
    this.activityArray = await getActivity(this.currentPage);
    this.activityArray?.forEach((val) => val.time = parseDate(val.time));

    ///////////////////////////////////
    this.activityArray = JSON.parse('[{"id_1":7,"name_1":"Мороз","id_2":8,"name_2":"Иммерсивный проект RESET 2.0","time":"2021-05-03T23:45:17","type":"user_event"},{"id_1":7,"name_1":"Мороз","id_2":11,"name_2":"Выставка «От Античности к Средневековью»","time":"2021-05-03T23:45:15","type":"user_event"},{"id_1":8,"name_1":"Мороз","id_2":9,"name_2":"Мороз","time":"2021-05-03T23:31:01","type":"subscription"},{"id_1":8,"name_1":"Мороз","id_2":7,"name_2":"Мороз","time":"2021-05-03T23:30:52","type":"subscription"},{"id_1":7,"name_1":"Мороз","id_2":5,"name_2":"","time":"2021-05-03T23:29:38","type":"subscription"},{"id_1":7,"name_1":"Мороз","id_2":3,"name_2":"Cool Name","time":"2021-05-03T23:29:36","type":"subscription"},{"id_1":7,"name_1":"Мороз","id_2":1,"name_2":"Анастасия","time":"2021-05-03T23:29:33","type":"subscription"}]');

    this.globalStore.eventBus.publish(ChannelNames.activityUpdated);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'activity/update':
        this.update(action.data);
        break;

      default:
        break;
    }
  }
}
