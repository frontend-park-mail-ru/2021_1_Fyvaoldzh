import { ChannelNames } from '../../config/config';
import Store from '../../storage/store';
import Actions from '../../actions/actions';
import OneFollowerComponent from './OneFollowerComponent';

const oneEventPageTemplate = require('Templates/one-event-page/one-event-page.pug');
const oneTagTemplate = require('Templates/one-event-page/tagTemplate.pug');
const onePlanningUserTemplate = require('Templates/one-event-page/one-going-user.pug');

interface TagInterface {
  id: number;
  name: string;
}

interface FollowerInterface {
  id: number;
  name: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface ToInviteInterface {
  eventId: number;
  invites: Array<number>;
}

export default class OneEventView {
  public globalStore: Store;

  public wrapper: HTMLElement;

  public actions: Actions;

  public toInvite: Array<number>;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
    this.toInvite = [];
  }

  renderEventPage() {
    const { oneEventData } = this.globalStore.oneEventStore;

    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = oneEventPageTemplate(oneEventData);
    this.wrapper.style.background = null;
    const eventPhoto = document.getElementById('jsPagePhoto');
    eventPhoto.style.background = `url(http://95.163.180.8:1323/api/v1/event/${oneEventData.id}/image) 
                                  no-repeat center / cover`;

    const eventStar = document.getElementById('jsEventStar');
    eventStar.addEventListener('click', this.starHandler.bind(this));

    document.getElementById('jsEventShare').addEventListener('click', this.shareHandler.bind(this));
    document.getElementById('jsEventFollowersDecline').addEventListener('click', this.declineHandler.bind(this));
    document.getElementById('jsEventFollowersAccept').addEventListener('click', this.acceptHandler.bind(this));

    if (!this.globalStore.userStore.userData) {
      document.getElementById('jsEventStar').style.display = 'none';
      document.getElementById('jsEventShare').style.display = 'none';
    }

    this.renderTags();

    if (this.globalStore.oneEventStore.isPlanning) {
      eventStar.classList.add('event-description__star_active');
      eventStar.classList.remove('event-description__star_inactive');
    }
    this.renderGoingUsers();
    this.renderFollowers();
  }

  renderTags() {
    const { tags } = this.globalStore.oneEventStore.oneEventData;
    const tagsRow = document.getElementById('jsTagsRow');

    tags.forEach((tag: TagInterface) => tagsRow.insertAdjacentHTML('beforeend', oneTagTemplate({ name: tag.name })));
  }

  renderGoingUsers() {
    const goingUsers = this.globalStore.oneEventStore.oneEventData.followers;

    const goingUsersRow = document.getElementById('jsPlanningUsers');

    if (goingUsers) {
      goingUsers.forEach((val: any) => goingUsersRow.insertAdjacentHTML('beforeend', onePlanningUserTemplate(val)));
    }
  }

  renderFollowers() {
    const followersColumn = document.getElementById('jsFollowersColumn');
    const followersArray: Array<FollowerInterface> = this.globalStore.userStore.followers;

    followersArray.forEach((val) => {
      const newFollower = new OneFollowerComponent(followersColumn, val);
      newFollower.render();
    });

    const followers = document.getElementsByClassName('event-follower-block');

    Array.from(followers).forEach((val) => {
      val.addEventListener('click', this.followerHandler.bind(this));
    });
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

  shareHandler() {
    document.getElementById('jsEventFollowers').style.display = 'flex';
  }

  declineHandler() {
    document.getElementById('jsEventFollowers').style.display = 'none';
  }

  acceptHandler() {
    const dataToSend = {
      event: this.globalStore.oneEventStore.oneEventData.id,
      to: this.toInvite,
    };

    this.actions.sendInvites(dataToSend);
    document.getElementById('jsEventFollowers').style.display = 'none';
  }

  followerHandler(ev: MouseEvent) {
    const target = ev.target as HTMLElement;
    target.classList.toggle('event-follower-block_active');

    const indexOf = this.toInvite.indexOf(<number><unknown>target.id);
    if (indexOf === -1) {
      this.toInvite.push(<number><unknown>target.id);
    } else {
      this.toInvite.splice(indexOf, 1);
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.eventCome, this.renderEventPage.bind(this));
  }
}
