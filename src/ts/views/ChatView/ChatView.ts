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
  }

  renderLeftMessages() {
    const leftMessages = this.globalStore.chatStore.leftMessages;
    const leftColumn = document.getElementById('jsChatLeft');

    leftMessages.forEach((val) => {
      const innerLeftMessage = new LeftMessageComponent(leftColumn, val);
      innerLeftMessage.render();
    })
  }

  renderRightMessages() {
    const rightMessages = this.globalStore.chatStore.rightMessages;
    const rightColumn = document.getElementById('jsChatRight');

    rightMessages.forEach((val) => {
      const innerLeftMessage = new RightMessageComponent(rightColumn, val);
      innerLeftMessage.render();
    })
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.chatUpdated, this.renderChat.bind(this));
  }
}
