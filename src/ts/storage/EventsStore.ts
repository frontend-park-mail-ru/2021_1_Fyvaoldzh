import { getAllEventsJson } from '../networkModule/network';
import { channelNames } from '../config/config';
import { ActionsInterface } from "../interfaces";

function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export default class EventsStore {
  public globalStore: any;
  public allEvents: object;
  public pageNumber: number;
  public updatingEvents: boolean;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.allEvents = {};
    this.pageNumber = 1;
    this.updatingEvents = false;
  }

  async update() {
    this.allEvents = await getAllEventsJson();
    this.globalStore.eventBus.publish(channelNames.eventsUpdated);
  }

  async uploadEventsContent() {
    if (this.updatingEvents) {
      return;
    }
    this.updatingEvents = true;
    ++this.pageNumber;
    const newEvents = await getAllEventsJson(this.pageNumber);

    const resultEvents = Array.prototype.concat(this.allEvents, newEvents);

    this.allEvents = resultEvents;
    this.globalStore.eventBus.publish(channelNames.eventsUpdated);
    await timeout(3);
    this.updatingEvents = false;
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'events/update':
        this.update();
        break;

      case 'events/uploadEventsContent':
        this.uploadEventsContent();

      default:
        break;
    }
  }
}
