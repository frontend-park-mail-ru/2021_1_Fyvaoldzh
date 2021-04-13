import { getAllEventsJson, getRecommendEvents } from '../networkModule/network';
import { ChannelNames } from '../config/config';
import { ActionsInterface } from '../interfaces';

function timeout(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default class EventsStore {
  public globalStore: any;

  public allEvents: object;

  public pageNumber: number;

  public updatingEvents: boolean;

  public eventCategory: string;

  public endOfPage: boolean;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.allEvents = {};
    this.pageNumber = 1;
    this.updatingEvents = false;
    this.eventCategory = '';
    this.endOfPage = false;
  }

  async update() {
    this.allEvents = await getAllEventsJson();
    this.globalStore.eventBus.publish(ChannelNames.eventsUpdated);
  }

  async uploadEventsContent() {
    if (this.updatingEvents || this.endOfPage) {
      return;
    }
    this.updatingEvents = true;
    this.pageNumber += 1;

    let newEvents;
    if (this.eventCategory === 'Рекомендации') {
      newEvents = await getRecommendEvents(this.pageNumber);
    } else {
      newEvents = await getAllEventsJson(this.pageNumber, this.eventCategory);
    }

    if (newEvents?.length < 6) {
      this.endOfPage = true;
    }

    if (!newEvents) {
      return;
    }

    this.allEvents = Array.prototype.concat(this.allEvents, newEvents);
    this.globalStore.eventBus.publish(ChannelNames.eventsUpdated);
    await timeout(3);
    this.updatingEvents = false;
  }

  async changeCategory(action: ActionsInterface) {
    this.eventCategory = action.data;
    this.pageNumber = 1;
    this.endOfPage = false;

    if (this.eventCategory === 'Рекомендации') {
      this.allEvents = await getRecommendEvents(this.pageNumber);
    } else {
      this.allEvents = await getAllEventsJson(this.pageNumber, this.eventCategory);
    }

    this.globalStore.eventBus.publish(ChannelNames.eventsUpdated);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'events/update':
        this.update();
        break;

      case 'events/uploadEventsContent':
        this.uploadEventsContent();
        break;

      case 'events/changeCategory':
        this.changeCategory(action);
        break;

      default:
        break;
    }
  }
}
