import { urlMap } from '../../config/config';

const rightMyMessageTemplate = require('Templates/chat/rightMyMessage.pug');
const rightSomeMessageTemplate = require('Templates/chat/rightSbMessage.pug');

interface Message {
  id: number;
  fromMe: boolean;
  text: string;
  date: string;
  redact: boolean;
  read: boolean;
}

export default class RightMessageComponent {
  private parent: HTMLElement;

  private data: Message;

  constructor(
    parent = document.body,
    data: Message,
  ) {
    this.parent = parent;
    this.data = data;
  }

  render() {
    let template: string;
    if (this.data.fromMe) {
      template = rightMyMessageTemplate(this.data);
    } else {
      template = rightSomeMessageTemplate(this.data);
    }


    this.parent.insertAdjacentHTML('beforeend', template);

    //const message = document.getElementById(<string><unknown> this.data.uid);
    //message.style.background = `url(${urlMap.imgUrl}/${this.data.uid}) no-repeat top / cover`;
  }
}
