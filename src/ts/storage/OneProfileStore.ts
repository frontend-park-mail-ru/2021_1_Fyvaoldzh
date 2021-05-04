import { ChannelNames, profileEventsButton } from '../config/config';

import { getProfileById, getPlanningEventsById, getVisitedEventsById } from '../networkModule/network';
import { ActionsInterface } from '../interfaces';

export default class OneProfileStore {
  public globalStore: any;

  public oneProfileData: any;

  public currentEventsButton: string;

  public oneProfilePlanningEvents: Array<any>;

  public oneProfileVisitedEvents: Array<any>;

  public currentEventsPage: number;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.oneProfileData = null;
    this.currentEventsButton = profileEventsButton.planning;
    this.oneProfilePlanningEvents = [];
    this.oneProfileVisitedEvents = [];
    this.currentEventsPage = 1;
  }

  async update(action: ActionsInterface) {
    // брать данные из урла:
    const { currentUrl } = this.globalStore.routerStore;

    this.currentEventsPage = currentUrl.searchParams.get('page') ? currentUrl.searchParams.get('page') : 1;

    this.currentEventsButton = currentUrl.searchParams.get('button')
      ? currentUrl.searchParams.get('button')
      : profileEventsButton.planning;

    // this.currentEventsPage = 1;
    // this.currentEventsButton = profileEventsButton.planning;

    this.oneProfileData = await getProfileById(action.data); // TODO брать из урла

    await this.updateEvents();
    this.globalStore.eventBus.publish(ChannelNames.oneProfileUpdated);
  }

  async updateByHistory() {
    // данные профиля не меняем - они остаются прежние

    // Брать данные из истории
    const params = history.state.parameter;

    const search = new URLSearchParams(params);

    this.currentEventsPage = search.get('page') ? <number>(<unknown>search.get('page')) : 1;

    this.currentEventsButton = search.get('button') ? search.get('button') : profileEventsButton.planning;

    // this.currentEventsPage = 1;
    // this.currentEventsButton = profileEventsButton.planning;

    await this.updateEventsByHistory();
    this.globalStore.eventBus.publish(ChannelNames.oneProfileUpdated);
  }

  async changeEventsButton(action: ActionsInterface) {
    this.currentEventsPage = 1;
    this.currentEventsButton = action.data;

    const curButtonPage = this.currentEventsPage;

    const params = [
      ['button', this.currentEventsButton],
      ['page', curButtonPage.toString()],
    ];

    const url = new URLSearchParams(params).toString();

    history.pushState(
      { page: `/profile${this.oneProfileData.Uid}`, parameter: params },
      null,
      `/profile${this.oneProfileData.Uid}?${url}`,
    );

    this.globalStore.eventBus.publish(ChannelNames.oneProfileEventsButtonChanged);
  }

  async updateEvents() {
    this.oneProfilePlanningEvents.length = 0;
    this.oneProfileVisitedEvents.length = 0;

    const planningJson = await getPlanningEventsById(this.oneProfileData.Uid);

    // никак не пагинируется т.к. мероприятия берутся не по запросу а из подгруженного json профиля
    if (this.oneProfileData.planning !== null) {
      Object.entries(planningJson).forEach(([, eventJson]) => {
        this.oneProfilePlanningEvents.push(eventJson);
      });
    }

    const visitedJson = await getVisitedEventsById(this.oneProfileData.Uid);

    if (this.oneProfileData.visited !== null) {
      Object.entries(visitedJson).forEach(([, eventJson]) => {
        this.oneProfileVisitedEvents.push(eventJson);
      });
    }

    const curButtonPage = this.currentEventsPage;

    const params = [
      ['button', this.currentEventsButton],
      ['page', curButtonPage.toString()],
    ];

    const urlParams = new URLSearchParams(params).toString();

    history.pushState(
      { page: `/profile${this.oneProfileData.Uid}`, parameter: params },
      null,
      `/profile${this.oneProfileData.Uid}?${urlParams}`,
    );
  }

  async updateEventsByHistory() {
    // тот же updateEventsByHistory, но буз пуша стейта истории
    // тот же updateEvents, но без пуша в историю
    this.oneProfilePlanningEvents.length = 0;
    this.oneProfileVisitedEvents.length = 0;

    const planningJson = await getPlanningEventsById(this.oneProfileData.Uid);

    // никак не пагинируется т.к. мероприятия берутся не по запросу а из подгруженного json профиля
    if (this.oneProfileData.planning !== null) {
      Object.entries(planningJson).forEach(([, eventJson]) => {
        this.oneProfilePlanningEvents.push(eventJson);
      });
    }

    const visitedJson = await getVisitedEventsById(this.oneProfileData.Uid);

    if (this.oneProfileData.visited !== null) {
      Object.entries(visitedJson).forEach(([, eventJson]) => {
        this.oneProfileVisitedEvents.push(eventJson);
      });
    }
  }

  async pageForward() {
    this.currentEventsPage++;
    await this.updateEvents();

    this.globalStore.eventBus.publish(ChannelNames.oneProfilePageChanged);
  }

  async pageBack() {
    this.currentEventsPage--;
    await this.updateEvents();

    this.globalStore.eventBus.publish(ChannelNames.oneProfilePageChanged);
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

      case 'oneProfile/updateByHistory':
        this.updateByHistory();
        break;

      default:
        break;
    }
  }
}
