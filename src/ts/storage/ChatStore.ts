import { ActionsInterface } from '../interfaces';
import { ChannelNames } from '../config/config';

interface LeftMessageInterface {
  uid: number;
  name: string;
  text: string;
  date: string;
  readed: boolean;
}

interface RightMessageInterface {
  text: string;
  from: string;
}

const messageLeft1 = {
  uid: 0,
  name: 'kek',
  text: 'adadwadw',
  date: 'aaaa',
  readed: false,
};

const messageLeft2 = {
  uid: 0,
  name: 'lol',
  text: 'aaaa',
  date: 'bbbb',
  readed: true,
};

const messageRight1 = {
  text: 'Я в своем познании настолько преисполнился',
  from: 'currentUser',
};

const messageRight2 = {
  text: 'Я в своем познании настолько преисполнился',
  from: 'someUser',
};

export default class ChatStore {
  public globalStore: any;

  public leftMessages: Array<LeftMessageInterface>;

  public rightChatterName: string;

  public rightMessages: Array<RightMessageInterface>;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.rightChatterName = 'Выберите собеседника';
    this.leftMessages = [];
    this.rightMessages = [];
  }

  async update() {
    this.leftMessages.push(messageLeft1);
    this.leftMessages.push(messageLeft2);

    this.globalStore.eventBus.publish(ChannelNames.chatUpdated);
  }

  async uploadChatHistory(userId: number) {
    switch (userId) {
      case 0:
        this.rightMessages.pop();
        this.rightMessages.push(messageRight1);

      case 1:
        this.rightMessages.pop();
        this.rightMessages.push(messageRight2);
    }
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'chat/update':
        this.update();
        break;

      case 'chat/uploadChatHistory':
        this.uploadChatHistory(action.data);
        break;

      default:
        break;
    }
  }
}
