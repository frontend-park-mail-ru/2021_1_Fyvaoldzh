import { ChannelNames, routes } from '../config/config';
import { ActionsInterface } from '../interfaces';

export default class RouterStore {
  public globalStore: any;

  public currentUrl: URL;

  constructor(globalStore: any) {
    this.globalStore = globalStore;
    this.currentUrl = null;
  }

  changePage(action: ActionsInterface) {
    this.currentUrl = new URL(
      <string>(<unknown>action.data),
      window.location.origin,
    );

    console.log(this.currentUrl.pathname);
    // если не страница поиска, не страница фолловеров и не страница чужого пользователя:
    if (this.currentUrl.pathname !== '/search' && !this.currentUrl.pathname.includes('followings')
        && !(this.currentUrl.pathname.includes('profile') && this.currentUrl.pathname !== routes.profile)) {
      window.history.pushState(
        {
          page: this.currentUrl.pathname,
          parameter: this.currentUrl.searchParams.get('tab'),
        },
        '',
        this.currentUrl.href,
      );
    }

    this.globalStore.eventBus.publish(ChannelNames.pageChanged);
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
