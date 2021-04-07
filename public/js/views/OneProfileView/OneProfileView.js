/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {pageNames, channelNames, urlMap, SERVER_ERRORS} from '../../config/config.js';
import {
  renderEventsList,
  addDeclensionOfNumbers,
  buttonToggleHandler,
} from '../../allProfilesUtils/allProfilesUtils.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class OneProfileView {
  constructor({globalStore, actions}) {
    this[globalStoreSymbol] = globalStore;
    this[actionsSymbol] = actions;
  }

  get globalStore() {
    return this[globalStoreSymbol];
  }

  get actions() {
    return this[actionsSymbol];
  }

  renderEventsList = renderEventsList; //так вообще нормально?

  renderOneProfilePage() {
    // if (this.globalStore.currentPage !== pageNames.oneProfilePage) {
    //   return;
    // }

    window.scroll(0, 0);
    const {oneProfileData} = this.globalStore.oneProfileStore;
    const {currentEventsButton} = this.globalStore.oneProfileStore;
    const {oneProfileEvents} = this.globalStore.oneProfileStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/one-profile/img/one-profile-background.jpg") no-repeat top / 100%';

    oneProfileData.age += addDeclensionOfNumbers(oneProfileData.age, [' год', ' года', ' лет']);
    oneProfileData.followers += addDeclensionOfNumbers(oneProfileData.followers, [
      ' подписчик',
      ' подписчика',
      ' подписчиков',
    ]);

    wrapper.innerHTML = '';
    wrapper.innerHTML = oneProfileTemplate(oneProfileData);
    wrapper.querySelector('.profile-main-block').insertAdjacentHTML('beforeend', profileEventsTabTemplate());

    let ava = document.getElementById('profileAvatar');
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
      this.renderEventsList.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.oneProfileUpdated,
      this.renderOneProfilePage.bind(this)
    );
  }
}
