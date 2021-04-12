import { getEventById, checkPlanningEvent, addPlanning, removePlanning } from '../networkModule/network';
import { channelNames } from '../config/config';
import { ActionsInterface } from "../interfaces";

interface oneEventDataInterface {
  id: number;
  place: string;
  description: string;
  startDate: string;
  endDate: string;
  subway: string;
  street: string;
  tags: Array<object>;
  category: string;
  followers: Array<object>;
}

interface planningAnswer {
  userId: number;
  eventId: number;
  isAdded: boolean;
}

export default class OneEventStore {
  public globalStore: any;
  public oneEventData: oneEventDataInterface;
  public isPlanning: boolean;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.oneEventData = null;
    this.isPlanning = false;
  }

  async update(action: ActionsInterface) {
    this.oneEventData = await getEventById(<number><unknown>action.data);
    const checkPlanningAnswer: planningAnswer = await checkPlanningEvent(this.oneEventData.id)

    if (this.globalStore.userStore.userData && checkPlanningAnswer.isAdded) {
      this.isPlanning = true;
    }
    this.globalStore.eventBus.publish(channelNames.eventCome);
  }

  async add(action: ActionsInterface) {
    await addPlanning(action.data);
    this.globalStore.eventBus.publish(channelNames.eventCome);
  }

  async remove(action: ActionsInterface) {
    await removePlanning(action.data);
    this.globalStore.eventBus.publish(channelNames.eventCome);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'oneEvent/update':
        this.update(action);
        break;

      case 'oneEvent/add':
        this.add(action);
        break;

      case 'oneEvent/remove':
        this.remove(action);
        break;

      default:
        break;
    }
  }
}
