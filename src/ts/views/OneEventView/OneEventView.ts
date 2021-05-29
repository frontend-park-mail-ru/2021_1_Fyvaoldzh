import { ChannelNames } from '../../config/config';
import Store from '../../storage/store';
import Actions from '../../actions/actions';
import OneFollowerComponent from './OneFollowerComponent';

import getMap from '../../map/map';
import { TagInterface, FollowerInterface, ToInviteInterface } from '../../interfaces/OneEventStoreInterfaces';

import {copyButtonHandler, eventPageShareButtonHandler, modalOverlayHandler} from "../utils/utils";

const oneEventPageTemplate = require('Templates/one-event-page/one-event-page.pug');
const oneTagTemplate = require('Templates/one-event-page/tagTemplate.pug');
const onePlanningUserTemplate = require('Templates/one-event-page/one-going-user.pug');
const emptyFollowers = require('Templates/one-event-page/emptyFollowers.pug');

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
    window.scroll(0, 0);
    const { oneEventData } = this.globalStore.oneEventStore;
    document.title = oneEventData.title;
    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = oneEventPageTemplate(oneEventData);
    this.wrapper.style.background = null;

    const eventStar = document.getElementById('jsEventStar');
    eventStar.addEventListener('click', this.starHandler.bind(this));

    document.getElementById('jsEventShare').addEventListener('click', this.shareHandler.bind(this));
    document.getElementById('jsEventFollowersDecline').addEventListener('click', this.declineHandler.bind(this));
    document.getElementById('jsEventFollowersAccept').addEventListener('click', this.acceptHandler.bind(this));

    if (!this.globalStore.userStore.userData) {
      document.getElementById('jsEventStar').style.display = 'none';
      document.getElementById('jsEventShare').style.display = 'none';
      document.getElementById('jsGoingText').style.display = 'none';
      document.getElementById('jsShareSubs').style.display = 'none';
    }

    this.renderTags();

    if (this.globalStore.oneEventStore.isPlanning) {
      eventStar.classList.add('event-description__star_active');
      document.getElementById('jsGoingText').innerText = 'Уже иду!';
      eventStar.classList.remove('event-description__star_inactive');
    }

    this.renderGoingUsers();
    this.renderFollowers();

    getMap(this.globalStore.oneEventStore.oneEventData.coordinates,
      this.globalStore.oneEventStore.oneEventData.title);

    // для кнопки шеринга мероприятия:
    const modalOverlay = document.querySelector('#modal-overlay');
    modalOverlay.addEventListener('click', modalOverlayHandler.bind(this));

    const copyButton = document.querySelector('#copyButton');
    copyButton.addEventListener('click', copyButtonHandler.bind(this));

    const shareButton = document.querySelector('.smbs-event__share-button');
    shareButton.addEventListener('click', eventPageShareButtonHandler.bind(this));


  }

  renderTags() {
    const { tags } = this.globalStore.oneEventStore.oneEventData;
    const tagsRow = document.getElementById('jsTagsRow');

    tags.forEach((tag: TagInterface) => tagsRow.insertAdjacentHTML('beforeend', oneTagTemplate({ name: tag.name })));
  }

  renderGoingUsers() {
    const goingUsers = this.globalStore.oneEventStore.oneEventData.followers;
    if (!goingUsers) {
      document.getElementById('jsGoingTitle').style.display = 'none';
    }

    const goingUsersRow = document.getElementById('jsPlanningUsers');

    if (goingUsers) {
      goingUsers.forEach((val: any) => goingUsersRow.insertAdjacentHTML('beforeend', onePlanningUserTemplate(val)));
    }
  }

  renderFollowers() {
    const followersColumn = document.getElementById('jsFollowersColumn');
    const followersArray: Array<FollowerInterface> = this.globalStore.userStore.followers;
    
    if (!followersArray.length) {
      document.getElementById('jsFollowersColumn').innerHTML = emptyFollowers();
      document.getElementById('jsEventFollowersAccept').style.display = 'none';
    }

    let index = 0;
    followersArray.forEach((val) => {
      if (index >= followersArray.length / 2) {
        return;
      }
      const newFollower = new OneFollowerComponent(followersColumn, val);
      newFollower.render();
      index++;
    });

    const followers = document.getElementsByClassName('event-follower-block');

    Array.from(followers).forEach((val) => {
      val.addEventListener('click', this.followerHandler.bind(this));
    });
  }

  starHandler(ev: MouseEvent) {
    const { target } = ev;

    if (target instanceof HTMLButtonElement && target.classList.contains('event-description__star_inactive')) {
      document.getElementById('jsGoingText').innerText = 'Уже иду!';
      target.classList.add('event-description__star_active');
      target.classList.remove('event-description__star_inactive');
      this.actions.addPlanningEvent(this.globalStore.oneEventStore.oneEventData.id);
      return;
    }

    if (target instanceof HTMLButtonElement && target.classList.contains('event-description__star_active')) {
      document.getElementById('jsGoingText').innerText = 'Пойти на мероприятие';
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
    const followerId = this.findElement(<HTMLElement>ev.target);
    if (followerId == null) {
      return;
    }
    ev.preventDefault();
    document.getElementById(followerId).classList.toggle('event-follower-block_active');

    const indexOf = this.toInvite.indexOf(<number><unknown>followerId);
    if (indexOf === -1) {
      this.toInvite.push(<number><unknown>followerId);
    } else {
      this.toInvite.splice(indexOf, 1);
    }
  }

  findElement(el: HTMLElement): any {
    // eslint-disable-next-line eqeqeq
    if (el.classList.contains('event-follower-block')) {
      return el.id;
    } if (el.parentElement) {
      return this.findElement(el.parentElement);
    }
    return null;
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.eventCome, this.renderEventPage.bind(this));
  }
}
