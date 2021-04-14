import { ChannelNames } from '../../config/config';
import Store from '../../storage/store';
import Actions from '../../actions/actions';

const oneEventPageTemplate = require('Templates/one-event-page/one-event-page.pug');
const oneTagTemplate = require('Templates/one-event-page/tagTemplate.pug');
const onePlanningUserTemplate = require('Templates/one-event-page/one-going-user.pug');

interface TagInterface {
  id: number;
  name: string;
}

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
    this.wrapper.style.background = `url(http://95.163.180.8:1323/api/v1/event/${oneEventData.id}/image) no-repeat top 140px right 70px`;
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = oneEventPageTemplate(oneEventData);

    const eventStar = document.getElementById('jsEventStar');
    eventStar.addEventListener('click', this.starHandler.bind(this));

    if (!this.globalStore.userStore.userData) {
      document.getElementById('jsEventStar').style.display = 'none';
    }

    this.renderTags();

    if (this.globalStore.oneEventStore.isPlanning) {
      eventStar.classList.add('event-description__star_active');
      eventStar.classList.remove('event-description__star_inactive');
    }
    this.renderGoingUsers();
  }

  renderTags() {
    const { tags } = this.globalStore.oneEventStore.oneEventData;
    const tagsRow = document.getElementById('jsTagsRow');

    tags.forEach((tag: TagInterface) => tagsRow.insertAdjacentHTML('beforeend', oneTagTemplate({ name: tag.name })));
  }

  renderGoingUsers() {
    const goingUsers = this.globalStore.oneEventStore.oneEventData.followers;

    const goingUsersRow = document.getElementById('jsPlanningUsers');
    goingUsers.forEach((val: any) => goingUsersRow.insertAdjacentHTML('beforeend', onePlanningUserTemplate(val)));
  }

  starHandler(ev: MouseEvent) {
    const { target } = ev;

    if (target instanceof HTMLButtonElement && target.classList.contains('event-description__star_inactive')) {
      target.classList.add('event-description__star_active');
      target.classList.remove('event-description__star_inactive');
      this.actions.addPlanningEvent(this.globalStore.oneEventStore.oneEventData.id);
      return;
    }

    if (target instanceof HTMLButtonElement && target.classList.contains('event-description__star_active')) {
      target.classList.add('event-description__star_inactive');
      target.classList.remove('event-description__star_active');
      this.actions.removePlanningEvent(this.globalStore.oneEventStore.oneEventData.id);
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.eventCome, this.renderEventPage.bind(this));
  }
}
