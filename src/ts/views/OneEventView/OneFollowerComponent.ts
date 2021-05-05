const followerTemplate = require('Templates/one-event-page/follower.pug');

interface FollowerInterface {
  id: number;
  name: string;
}

export default class OneFollowerComponent {
  public parent: HTMLElement;

  public data: FollowerInterface;

  constructor(
    parent = document.body,
    data: FollowerInterface,
  ) {
    this.parent = parent;
    this.data = data;
  }

  render() {
    const template = followerTemplate(this.data);
    this.parent.insertAdjacentHTML('beforeend', template);
  }
}
