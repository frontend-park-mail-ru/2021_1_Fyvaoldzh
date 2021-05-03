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
  id: number;
  text: string;
}

const answerFromBack = '[{"id":1,"interlocutor":{"id":1,"name":"Анастасия","avatar":"public/default.png"},"message":{"id":1,"fromMe":true,"text":"first message","date":"2021-05-01 22:43:41.491382 +0000 UTC","redact":false,"read":false}}]';
const rightAnswerFromBack = '{"id":1,"interlocutor":{"id":1,"name":"Анастасия","avatar":"public/default.png"},"messages":[{"id":9,"fromMe":true,"text":"first message","date":"2021-05-01 22:43:41.491382 +0000 UTC","redact":false,"read":false}]}';
const rightAnswerFromBack2 = '{"id":1,"interlocutor":{"id":1,"name":"Анастасия","avatar":"public/default.png"},"messages":[{"id":9,"fromMe":false,"text":"aaaaaaa","date":"2021-05-01 22:43:41.491382 +0000 UTC","redact":false,"read":false}]}';


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
    this.leftMessages = await getAllDialogues();
    console.log(this.leftMessages);
    this.leftMessages.forEach((val) => val.message.date = parseDate(val.message.date));
    await this.uploadChatHistory(this.interlocturId);
    this.globalStore.eventBus.publish(ChannelNames.chatUpdated);
  }

  async uploadChatHistory(userId: number) {
    if (userId === null) {
      return;
    }
    const page = 1;
    let rightAnswer: RightChatAnswer = await getOneDialog(page, userId); // Ответ с бэка
    this.rightMessages = rightAnswer.messages;
    this.rightChatterName = rightAnswer.interlocutor.name;
  }

  async sendMessage(messageText: string) {
    const messageToSend: MessageToSend = {
      to: 17,
      text: messageText,
    }

    await postMessage(messageToSend);
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
