import { channelNames } from '../../config/config';
import Store from "../../storage/store";
import Actions from "../../actions/actions";

const oneEventPageTemplate = require('Templates/one-event-page/one-event-page.pug');

export default class OneEventView {
  public globalStore: Store;
  public wrapper: HTMLElement;
  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
  }

  renderEventPage() {
    const { oneEventData } = this.globalStore.oneEventStore;
    this.wrapper.style.backgroundImage = 'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = oneEventPageTemplate(oneEventData);

    const eventStar = document.getElementById('jsEventStar');
    eventStar.addEventListener('click', this.starHandler.bind(this));

    if (!this.globalStore.userStore.userData) {
      document.getElementById('jsEventStar').style.display = 'none';
    }

    if (this.globalStore.oneEventStore.isPlanning) {
      eventStar.classList.remove('event-description__star_inactive');
      eventStar.classList.add('event-description__star_active');
    }
  }

  starHandler(ev: MouseEvent) {
    const { target } = ev;

    if (target instanceof HTMLButtonElement && target.classList.contains('event-description__star_inactive')) {
      this.actions.addPlanningEvent(this.globalStore.oneEventStore.oneEventData.id);
      return;
    }

    if (target instanceof HTMLButtonElement && target.classList.contains('event-description__star_active')) {
      this.actions.removePlanningEvent(this.globalStore.oneEventStore.oneEventData.id);
      return;
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(channelNames.eventCome, this.renderEventPage.bind(this));
  }
}
