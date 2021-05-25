import {
  getEventById, checkPlanningEvent, addPlanning, removePlanning, inviteFollowers,
} from '../networkModule/network';
import { ChannelNames } from '../config/config';
import { ActionsInterface } from '../interfaces';
import { parseDate } from '../views/utils/utils';
import { OneEventDataInterface, PlanningAnswer } from '../interfaces/OneEventStoreInterfaces';

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

  async sendInvites(action: ActionsInterface) {
    await inviteFollowers(action.data);
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

      case 'oneEvent/sendInvites':
        this.sendInvites(action);
        break;

      default:
        break;
    }
  }
}
