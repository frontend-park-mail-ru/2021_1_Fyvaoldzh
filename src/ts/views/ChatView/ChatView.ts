import Store from '../../storage/store';
import Actions from '../../actions/actions';
import LeftMessageComponent from './LeftMessageComponent';
import RightMessageComponent from './RightMessageComponent';
import { ChannelNames } from '../../config/config';

const chatBaseTemplate = require('../../../templates/chat/chatBaseTemplate.pug');

export default class EventsView {
  public globalStore: Store;

  public wrapper: HTMLElement;

  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
  }

  renderChat() {
    this.wrapper.innerHTML = chatBaseTemplate();
    this.renderLeftMessages();
    this.renderRightMessages();
    document.getElementById('jsSendMessageButton').addEventListener('click', this.buttonSendHandler.bind(this));
  }

  renderLeftMessages() {
    const leftMessages = this.globalStore.chatStore.leftMessages;
    const leftColumn = document.getElementById('jsChatLeft');

    leftMessages.forEach((val) => {
      console.log(val);
      const innerLeftMessage = new LeftMessageComponent(leftColumn, val);
      innerLeftMessage.render();
    })
  }

  renderRightMessages() {
    const rightMessages = this.globalStore.chatStore.rightMessages;
    const rightColumn = document.getElementById('jsChatMessages');
    document.getElementById('jsNameCompanion').innerText = this.globalStore.chatStore.rightChatterName;

    rightMessages.forEach((val) => {
      const innerLeftMessage = new RightMessageComponent(rightColumn, val);
      innerLeftMessage.render();
    })
  }

  buttonSendHandler() {
    const textarea: HTMLInputElement = <HTMLInputElement>document.getElementById('jsMessageInput');
    console.log(textarea.value);
    this.actions.sendMessage(textarea.value);
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.chatUpdated, this.renderChat.bind(this));
  }
}
