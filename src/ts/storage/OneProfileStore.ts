import { getProfileById } from '../networkModule/network';

import {
  ChannelNames, profileEventsButton,
} from '../config/config';
import { ActionsInterface } from '../interfaces';

export default class OneProfileStore {
  public globalStore: any;

  public oneProfileData: any;

  public currentEventsButton: any;

  public oneProfilePlanningEvents: any;

  public oneProfileVisitedEvents: any;

  public currentEventsPage: any;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.oneProfileData = null;
    this.currentEventsButton = profileEventsButton.planning;
    this.oneProfilePlanningEvents = [];
    this.oneProfileVisitedEvents = [];
    this.currentEventsPage = 1;
  }

  async update(action: ActionsInterface) {
    this.currentEventsPage = 1;
    this.oneProfileData = await getProfileById(action.data);
    this.currentEventsButton = profileEventsButton.planning;
    await this.updateEvents();
    this.globalStore.eventBus.publish(ChannelNames.oneProfileUpdated);
  }

  async changeEventsButton(action: ActionsInterface) {
    this.currentEventsPage = 1;
    this.currentEventsButton = action.data;
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(
          ChannelNames.oneProfileEventsButtonChanged,
          this.oneProfilePlanningEvents,
        );
        break;
      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(
          ChannelNames.oneProfileEventsButtonChanged,
          this.oneProfileVisitedEvents,
        );
        break;

      default:
        break;
    }
  }

  async updateEvents() {
    this.oneProfilePlanningEvents.length = 0;
    this.oneProfileVisitedEvents.length = 0;

    if (this.oneProfileData.planning !== null) {
      for (const event of this.oneProfileData.planning) {
        this.oneProfilePlanningEvents.push(event);
      }
    }

    if (this.oneProfileData.visited !== null) {
      for (const event of this.oneProfileData.visited) {
        this.oneProfileVisitedEvents.push(event);
      }
    }
  }

  async pageForward() {
    this.currentEventsPage++;
    await this.updateEvents();
    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(ChannelNames.oneProfilePageChanged, this.oneProfilePlanningEvents);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(ChannelNames.oneProfilePageChanged, this.oneProfileVisitedEvents);
        break;

      default:
        break;
    }
  }

  async pageBack() {
    this.currentEventsPage--;
    await this.updateEvents();

    switch (this.currentEventsButton) {
      case profileEventsButton.planning:
        this.globalStore.eventBus.publish(ChannelNames.oneProfilePageChanged, this.oneProfilePlanningEvents);
        break;

      case profileEventsButton.visited:
        this.globalStore.eventBus.publish(ChannelNames.oneProfilePageChanged, this.oneProfileVisitedEvents);
        break;

      default:
        break;
    }
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'oneProfile/changeEventsButton':
        this.changeEventsButton(action);
        break;

      case 'oneProfile/update':
        this.update(action);
        break;

      case 'oneProfile/updateEvents':
        this.updateEvents();
        break;

      case 'oneProfile/pageForward':
        this.pageForward();
        break;

      case 'oneProfile/pageBack':
        this.pageBack();
        break;

      default:
        break;
    }
  }
}
