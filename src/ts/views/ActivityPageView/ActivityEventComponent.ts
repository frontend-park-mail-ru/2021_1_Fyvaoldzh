import { urlMap } from '../../config/config';

const subscribeTemplate = require('Templates/activity/subscribe.pug');
const eventTemplate = require('Templates/activity/event.pug');
const followTemplate = require('Templates/activity/followOnMe.pug');

interface UserEventInterface {
  id_1: number;
  name_1: string;
  id_2: number;
  name_2: string;
  time: string;
  type: string;
}

export default class ActivityEventComponent {
  private parent: HTMLElement;

  private data: UserEventInterface;

  constructor(
    parent = document.body,
    data: UserEventInterface,
  ) {
    this.parent = parent;
    this.data = data;
  }

  render() {
    let template: string;

    switch (this.data.type) {
      case 'subscription':
        template = subscribeTemplate(this.data);
        break;

      case 'user_event':
        template = eventTemplate(this.data);
        break;

      case 'new_follower':
        template = followTemplate(this.data);
        break;
    }

    this.parent.insertAdjacentHTML('beforeend', template);
  }
}
