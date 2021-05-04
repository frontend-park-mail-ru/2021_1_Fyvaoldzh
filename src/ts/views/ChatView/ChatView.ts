import Store from '../../storage/store';
import Actions from '../../actions/actions';
import LeftMessageComponent from './LeftMessageComponent';
import RightMessageComponent from './RightMessageComponent';
import { ChannelNames } from '../../config/config';

const chatBaseTemplate = require('../../../templates/chat/chatBaseTemplate.pug');
const leftUpper = require('../../../templates/chat/jsLeftUpper.pug');

export default class ChatView {
  public globalStore: Store;

  public wrapper: HTMLElement;

  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.wrapper = document.getElementById('wrapper');
    this.actions = actions;
  }

  renderChat() {
    if (this.globalStore.routerStore.currentUrl.pathname !== '/chat') {
      return;
    }

    console.log(this.globalStore.routerStore.currentUrl.pathname);
    this.wrapper.innerHTML = chatBaseTemplate();
    this.renderLeftMessages();
    this.renderRightMessages();
    document.getElementById('jsSendMessageButton').addEventListener('click', this.buttonSendHandler.bind(this));
    document.getElementById('jsMessageInput').addEventListener('keydown', this.keydownHandler.bind(this));
    (<HTMLInputElement>document.getElementById('jsMessageInput')).select();

    if (this.globalStore.chatStore.interlocturId) {
      document.getElementById('jsMessageInputWrapper').style.display = 'block';
    } else {
      document.getElementById('jsMessageInputWrapper').style.display = 'none';
    }

    if (!this.isFullscreen()) {
      if (this.globalStore.chatStore.interlocturId) {
        document.getElementById('jsChatLeft').style.display = 'none';
        document.getElementById('jsChatRight').style.display = 'flex';
      }

      if (!this.globalStore.chatStore.interlocturId) {
        document.getElementById('jsChatLeft').style.display = 'flex';
        document.getElementById('jsChatRight').style.display = 'none';
      }
    }

    const chatMessages = document.getElementById('jsChatMessages');
    if (!chatMessages) {
      return;
    }

    setTimeout(() => {
      chatMessages.scroll(0, chatMessages.scrollHeight);
    }, 5)
  }

  renderLeftMessages() {
    if (this.globalStore.routerStore.currentUrl.pathname !== '/chat') {
      return;
    }

    const leftMessages = this.globalStore.chatStore.leftMessages;
    const leftColumn = document.getElementById('jsChatLeft');
    leftColumn.innerHTML = '';
    leftColumn.innerHTML = leftUpper();

    leftMessages?.forEach((val) => {
      const innerLeftMessage = new LeftMessageComponent(leftColumn, val);
      innerLeftMessage.render();
    })
  }

  renderRightMessages() {
    if (this.globalStore.routerStore.currentUrl.pathname !== '/chat') {
      return;
    }

    const rightMessages = this.globalStore.chatStore.rightMessages;
    const rightColumn = document.getElementById('jsChatMessages');
    if (!rightColumn) {
      return;
    }

    document.getElementById('jsNameCompanion').innerText = this.globalStore.chatStore.rightChatterName;

    const reversedMessages = rightMessages?.slice().reverse();
    rightColumn.innerHTML = '';
    reversedMessages?.forEach((val) => {
      const innerLeftMessage = new RightMessageComponent(rightColumn, val);
      innerLeftMessage.render();
    });
  }

  buttonSendHandler() {
    const textarea: HTMLInputElement = <HTMLInputElement>document.getElementById('jsMessageInput');
    if (textarea.value === '') {
      return;
    }
    this.actions.sendMessage(textarea.value);
    textarea.value = '';
  }

  isFullscreen() {
    const leftChatStyle = getComputedStyle(document.getElementById('jsChatLeft'));
    const rightChatStyle = getComputedStyle(document.getElementById('jsChatRight'));

    if (leftChatStyle.display !== 'none' && rightChatStyle.display !== 'none') {
      return true;
    }
    return false;
  }

  keydownHandler(ev: KeyboardEvent) {
    if (ev.shiftKey && ev.keyCode === 13) {
      return;
    }

    if (ev.keyCode === 13) {
      ev.preventDefault();
      document.getElementById('jsSendMessageButton').click();
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.chatUpdated, this.renderChat.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.chatUploaded, this.renderRightMessages.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.chatUploaded, this.renderLeftMessages.bind(this));
  }
}
