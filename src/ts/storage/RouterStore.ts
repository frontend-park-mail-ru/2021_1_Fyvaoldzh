import { channelNames } from '../config/config';
import { ActionsInterface } from '../interfaces'

export default class RouterStore {
  public globalStore: any;
  public currentUrl: URL;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.currentUrl = null;
  }

  changePage(action: ActionsInterface) {
    this.currentUrl = new URL(<string><unknown>action.data, 'http://95.163.180.8:1323/');
    window.history.pushState({page: this.currentUrl.pathname, parameter: this.currentUrl.searchParams.get('tab')},
      '',
      this.currentUrl.href);
    this.globalStore.eventBus.publish(channelNames.pageChanged);
  }

  reducer(action: ActionsInterface) {
    switch (action.eventName) {
      case 'router/changePage':
        this.changePage(action);
        break;

      default:
        break;
    }
  }
}
