import {
  getEventById, checkPlanningEvent, addPlanning, removePlanning,
} from '../networkModule/network';
import { ChannelNames } from '../config/config';
import { ActionsInterface } from '../interfaces';
import {parseDate} from "../views/utils/utils";

interface OneEventDataInterface {
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

interface PlanningAnswer {
  userId: number;
  eventId: number;
  isAdded: boolean;
}

export default class OneEventStore {
  public globalStore: any;

  public oneEventData: OneEventDataInterface;

  public isPlanning: boolean;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.oneEventData = null;
    this.isPlanning = false;
  }

  async update(action: ActionsInterface) {
    this.oneEventData = await getEventById(<number><unknown>action.data);
    const checkPlanningAnswer: PlanningAnswer = await checkPlanningEvent(this.oneEventData.id);
    this.oneEventData.startDate = parseDate(this.oneEventData.startDate);
    this.oneEventData.endDate = parseDate(this.oneEventData.endDate);

    if (this.globalStore.userStore.userData && checkPlanningAnswer.isAdded) {
      this.isPlanning = true;
    }

    if (!checkPlanningAnswer.isAdded) {
      this.isPlanning = false;
    }
    this.globalStore.eventBus.publish(ChannelNames.eventCome);
  }

  async add(action: ActionsInterface) {
    await addPlanning(action.data);
  }

  async remove(action: ActionsInterface) {
    await removePlanning(action.data);
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
