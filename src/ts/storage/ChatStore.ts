import { ActionsInterface } from '../interfaces';
import { ChannelNames } from '../config/config';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

import {
  getAllDialogues,
  getOneDialog,
  deleteOneDialog,
  postMessage} from '../networkModule/network';

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

interface RightChatAnswer {
  id: number;
  interlocutor: Interlocutor;
  messages: Array<Message>;
}

interface MessageToSend {
  to: number;
  text: string;
}


export default class ChatStore {
  public globalStore: any;

  public leftMessages: Array<LeftMessageInterface>;

  public rightChatterName: string;

  public rightMessages: Array<Message>;

  public interlocturId: number;

  public searchString: string;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.rightChatterName = 'Выберите собеседника';
    this.leftMessages = [];
    this.rightMessages = [];
    this.interlocturId = null;
    this.searchString = '';
  }

  async update(renderOnlyMessages?: boolean) {
    this.interlocturId = <number><unknown>(new URL(window.location.href).searchParams.get('c'));
    console.log(this.interlocturId);
    this.leftMessages = await getAllDialogues(1, this.searchString);
    console.log(this.leftMessages);
    this.leftMessages?.forEach((val) => val.message.date = parseChatTime(val.message.date));
    await this.uploadChatHistory(this.interlocturId);
    if (renderOnlyMessages) {
      this.globalStore.eventBus.publish(ChannelNames.chatUploaded);
    } else {
      this.globalStore.eventBus.publish(ChannelNames.chatUpdated);
    }
  }

  async uploadChatHistory(userId: number) {
    if (userId === null) {
      this.rightMessages = [];
      this.rightChatterName = 'Выберите собеседника';
      return;
    }

    const page = 1;
    let rightAnswer: RightChatAnswer = await getOneDialog(page, userId); // Ответ с бэка
    this.rightMessages = rightAnswer.messages;
    this.rightChatterName = rightAnswer.interlocutor.name;
  }

  async sendMessage(messageText: string) {
    const messageToSend: MessageToSend = {
      to: this.interlocturId,
      text: messageText,
    }

    console.log(JSON.stringify(messageToSend));

    const answer = await postMessage(messageToSend);
    this.uploadChatHistory(this.interlocturId);
  }

  changeSearch(search: string) {
    this.searchString = search;

  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'chat/update':
        this.update(action.data);
        break;

      case 'chat/uploadChatHistory':
        this.uploadChatHistory(action.data);
        break;

      case 'chat/sendMessage':
        this.sendMessage(action.data);
        break;

      case 'chat/chatSearchChanged':
        this.changeSearch(action.data);
        break;

      default:
        break;
    }
  }
}

export function parseChatTime(dateInput: any) {
  if (dateInput.includes('UTC')) {
    const date = new Date(Date.parse(dateInput));
    const options = {
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('ru', <DateTimeFormatOptions>options);
  }
  return dateInput;
}
