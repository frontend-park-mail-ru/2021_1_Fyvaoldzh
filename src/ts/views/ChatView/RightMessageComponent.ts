import { urlMap } from '../../config/config';

const rightMessageTemplate = require('Templates/chat/rightMessage.pug');

interface RightMessageInterface {
  text: string;
  from: string;
}

export default class RightMessageComponent {
  public parent: HTMLElement;

  public data: RightMessageInterface;

  constructor(
    parent = document.body,
    data: RightMessageInterface,
  ) {
    this.parent = parent;
    this.data = data;
  }

  render() {
    const template = rightMessageTemplate(this.data);

    this.parent.insertAdjacentHTML('beforeend', template);
    //const message = document.getElementById(<string><unknown> this.data.uid);
    //message.style.background = `url(${urlMap.imgUrl}/${this.data.uid}) no-repeat top / cover`;
  }
}
