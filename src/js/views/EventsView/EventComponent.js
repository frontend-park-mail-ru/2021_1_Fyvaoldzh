import { urlMap } from '../../config/config.js';

const oneTableEventTemplate = require('Templates/events/one-table-event.pug');

export default class EventComponent {
  constructor({
    parent = document.body,
    data = {},
  }) {
    this._parent = parent;
    this._data = data;
  }

  render() {
    const template = oneTableEventTemplate(this._data);

    this._parent.insertAdjacentHTML('beforeend', template)
    const eventGet = document.getElementById(this._data.id);

    eventGet.style.background = `url(${urlMap.imgEventUrl + this._data.id}/image) no-repeat top / cover`;
  }
}
