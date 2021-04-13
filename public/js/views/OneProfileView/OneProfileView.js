/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {profileEventsButton, pageNames, channelNames, urlMap, SERVER_ERRORS} from '../../config/config.js';
import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  paginatorHandler,
  updatePaginationState,
} from '../utils/utils.js';
import ProfilesBaseView from '../ProfilesBaseView/ProfilesBaseView.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class OneProfileView extends ProfilesBaseView {
  constructor({globalStore, actions}) {
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
    // if (this.globalStore.currentPage !== pageNames.oneProfilePage) {
    //   return;
    // }

    window.scroll(0, 0);
    const {oneProfileData} = this.globalStore.oneProfileStore;
    const {currentEventsButton} = this.globalStore.oneProfileStore;
    const {oneProfilePlanningEvents} = this.globalStore.oneProfileStore;
    const {oneProfileVisitedEvents} = this.globalStore.oneProfileStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/one-profile/img/one-profile-background.jpg") no-repeat top / 100%';

    oneProfileData.age = addDeclensionOfNumbers(oneProfileData.age, ['год', 'года', 'лет']);
    oneProfileData.followers = addDeclensionOfNumbers(oneProfileData.followers, [
      'подписчик',
      'подписчика',
      'подписчиков',
    ]);

    wrapper.innerHTML = '';
    wrapper.innerHTML = oneProfileTemplate(oneProfileData);
    wrapper.querySelector('.profile-main-block').insertAdjacentHTML('beforeend', profileEventsTabTemplate());

    const {currentEventsPage} = this.globalStore.oneProfileStore;

    const eventsPaginator = document.getElementById('paginator');
    eventsPaginator.innerHTML = paginationBlockTemplate({page: currentEventsPage});

    switch (currentEventsButton) {
      case profileEventsButton.planning:
        // updatePaginationState(currentEventsPage, oneProfilePlanningEvents.length);  //использовать, когда на бэке будет пагинация
        updatePaginationState(currentEventsPage, 1);

        break;
      case profileEventsButton.visited:
        // updatePaginationState(currentEventsPage, oneProfileVisitedEvents.length);  //тоже
        updatePaginationState(currentEventsPage, 1);
        break;
    }

    document.getElementById('paginationBack').addEventListener('click', paginatorHandler.bind(this));
    document.getElementById('paginationForward').addEventListener('click', paginatorHandler.bind(this));

    // const eventsList = document.getElementById('events-list');
    // eventsList.innerHTML = profileEventsTabTemplate();

    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${urlMap.imgUrl + oneProfileData.Uid}) no-repeat center / cover`;

    const eventsButtonsBlock = document.getElementById('jsEventsButtonsBlock');
    // eventsButtonsBlock.addEventListener('click', buttonToggleHandler.bind(this));
    let buttons = Array.from(eventsButtonsBlock.querySelectorAll('button[data-buttontype="toggle"]'));
    buttons.forEach(button => {
      button.addEventListener('click', buttonToggleHandler.bind(this));
    });

    switch (currentEventsButton) {
      case profileEventsButton.planning:
        this.renderEventsList(oneProfilePlanningEvents);
        break;

      case profileEventsButton.visited:
        this.renderEventsList(oneProfileVisitedEvents);
        break;

      default:
        break;
    }
  }

  subscribeViews() {
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.oneProfileUpdated,
      this.renderOneProfilePage.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.oneProfilePageChanged,
      this.renderEventsList.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.oneProfileEventsButtonChanged,
      this.renderEventsList.bind(this)
    );
  }
}
