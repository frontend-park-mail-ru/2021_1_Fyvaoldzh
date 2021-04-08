import { channelNames } from '../config/config';
import Store from "./store";
import {ActionsInterface} from "../actions/actions";

const globalStoreSymbol = Symbol('globalStoreSymbol');
const currentUrlSymbol = Symbol('currentUrlSymbol');

export default class RouterStore {
  public globalStore: Store;
  public currentUrl: URL;

  constructor(globalStore: Store) {
    this.globalStore = globalStore;
    this.currentUrl = null;
  }

  changePage(action: ActionsInterface) {
    this.currentUrl = new URL(<string><unknown>action.data, 'http://localhost:3000/');
    window.history.pushState(null, '', this.currentUrl.href);
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
