import Store from '../../storage/store';
import Actions from '../../actions/actions';
import ActivityEventComponent from './ActivityEventComponent';
import { ChannelNames } from '../../config/config';

const activityBaseTemplate = require('../../../templates/activity/activityBaseTemplate.pug');

export default class ActivityPageView {
  public globalStore: Store;

  public wrapper: HTMLElement;

  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
  }

  renderActivity() {
    this.wrapper.innerHTML = activityBaseTemplate();

    const activities = this.globalStore.activityStore.activityArray;

    const activityColumn = document.getElementById('jsActivity');

    // @ts-ignore
    activities.forEach((val) => {
      const oneActivity = new ActivityEventComponent(activityColumn, val);
      oneActivity.render();
    });
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.activityUpdated, this.renderActivity.bind(this));
  }
}
