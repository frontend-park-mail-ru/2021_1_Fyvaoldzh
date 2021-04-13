import { urlMap } from '../../config/config';

const oneTableEventTemplate = require('Templates/events/one-table-event.pug');

interface EventComponentInterface {
  id: number;
  title: string;
  place: string;
  description: string;
  date: string;
  subway: string;
  street: string;
  typeEvent: string;
}

export default class EventComponent {
  public parent: HTMLElement;

  public data: EventComponentInterface;

  constructor(
    parent = document.body,
    data: EventComponentInterface,
  ) {
    this.parent = parent;
    this.data = data;
  }

  render() {
    const template = oneTableEventTemplate(this.data);

    this.parent.insertAdjacentHTML('beforeend', template);
    const eventGet = document.getElementById(<string><unknown> this.data.id);

    eventGet.style.background = `url(${urlMap.imgEventUrl}/${this.data.id}/image) no-repeat top / cover`;
  }
}
