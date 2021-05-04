import { ActionsInterface } from '../interfaces';
import { ChannelNames } from '../config/config';
import { parseDate } from '../views/utils/utils';
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

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.rightChatterName = 'Выберите собеседника';
    this.leftMessages = [];
    this.rightMessages = [];
    this.interlocturId = null;
  }

  async update() {
    this.interlocturId = <number><unknown>(new URL(window.location.href).searchParams.get('c'));
    console.log(this.interlocturId);
    this.leftMessages = await getAllDialogues();
    this.leftMessages?.forEach((val) => val.message.date = parseDate(val.message.date));
    await this.uploadChatHistory(this.interlocturId);
    this.globalStore.eventBus.publish(ChannelNames.chatUpdated);
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
      to: 71,
      //to: <number>this.interlocturId,
      text: messageText,
    }

    const answer = await postMessage(messageToSend);
    this.update();
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'chat/update':
        this.update();
        break;

      case 'chat/uploadChatHistory':
        this.uploadChatHistory(action.data);
        break;

      case 'chat/sendMessage':
        this.sendMessage(action.data);
        break;

      default:
        break;
    }
  }
}
