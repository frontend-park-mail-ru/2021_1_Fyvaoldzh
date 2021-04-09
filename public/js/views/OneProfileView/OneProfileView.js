import {
  channelNames, urlMap, pageNames
} from '../../config/config.js';
import { addDeclensionOfNumbers, buttonToggleHandler } from '../utils/utils.js';
import ProfilesBaseView from '../ProfilesBaseView/ProfilesBaseView.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class OneProfileView extends ProfilesBaseView {
  constructor({ globalStore, actions }) {
    super();
    this[globalStoreSymbol] = globalStore;
    this[actionsSymbol] = actions;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get actions() {
    return this[actionsSymbol];
  }

  renderOneProfilePage() {
    if (this.globalStore.currentPage !== pageNames.oneProfilePage) {
      return;
    }

    window.scroll(0, 0);
    const { oneProfileData } = this.globalStore.oneProfileStore;
    const { currentEventsButton } = this.globalStore.oneProfileStore;
    const { oneProfileEvents } = this.globalStore.oneProfileStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/one-profile/img/one-profile-background.jpg") no-repeat top / 100%';

    oneProfileData.age += addDeclensionOfNumbers(oneProfileData.age, ['год', 'года', 'лет']);
    oneProfileData.followers += addDeclensionOfNumbers(oneProfileData.followers, [
      'подписчик',
      'подписчика',
      'подписчиков',
    ]);

    wrapper.innerHTML = '';
    wrapper.innerHTML = oneProfileTemplate(oneProfileData);
    wrapper.querySelector('.profile-main-block').insertAdjacentHTML('beforeend', profileEventsTabTemplate());

    const ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${urlMap.imgUrl + oneProfileData.Uid}) no-repeat center / cover`;

    const eventsButtonsBlock = document.getElementById('jsEventsButtonsBlock');

    eventsButtonsBlock.addEventListener('click', buttonToggleHandler.bind(this));

    switch (currentEventsButton) {
      case 'planningEventsButton':
        this.renderEventsList(oneProfileEvents);
        break;

      case 'visitedEventsButton':
        this.renderEventsList([]);
        break;

      default:
        break;
    }
  }

  subscribeViews() {
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.oneProfileEventsButtonChanged,
      this.renderEventsList.bind(this),
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.oneProfileUpdated,
      this.renderOneProfilePage.bind(this),
    );
  }
}
