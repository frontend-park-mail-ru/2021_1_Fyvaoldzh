import { getAllEventsJson } from '../networkModule/network';
import { channelNames } from '../config/config';
import {ActionsInterface} from "../interfaces";

export default class EventsStore {
  public globalStore: any;
  public allEvents: object;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.allEvents = {};
  }

  async update() {
    this.allEvents = await getAllEventsJson();
    this.globalStore.eventBus.publish(channelNames.eventsUpdated);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'events/update':
        this.update();
        break;

      default:
        break;
    }
  }
}
