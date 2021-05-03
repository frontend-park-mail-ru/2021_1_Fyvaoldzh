import { urlMap } from '../../config/config';

const leftMessageTemplate = require('Templates/chat/leftMessage.pug');

interface LeftMessageInterface {
  id: number;
  interlocutor: Interlocutor;
  message: Message;
}

interface Interlocutor {
  id: number;
  name: string;
  avatar: string;
}

interface Message {
  id: number;
  fromMe: boolean;
  text: string;
  date: string;
  redact: boolean;
  read: boolean;
}

export default class LeftMessageComponent {
  public parent: HTMLElement;

  public data: LeftMessageInterface;

  constructor(
    parent = document.body,
    data: LeftMessageInterface,
  ) {
    this.parent = parent;
    this.data = data;
  }

  render() {
    const template = leftMessageTemplate(this.data);

    this.parent.insertAdjacentHTML('beforeend', template);

    //const message = document.getElementById(<string><unknown> this.data.uid);
    //message.style.background = `url(${urlMap.imgUrl}/${this.data.uid}) no-repeat top / cover`;
  }
}
