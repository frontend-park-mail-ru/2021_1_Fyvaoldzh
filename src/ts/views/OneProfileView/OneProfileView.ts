import {
  profileEventsButton, ChannelNames, urlMap,
} from '../../config/config';
import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  oneProfilePaginatorHandler,
  updatePaginationState,
} from '../utils/utils';
import ProfilesBaseView from '../ProfilesBaseView/ProfilesBaseView';
import Store from '../../storage/store';
import Actions from '../../actions/actions';

const oneProfileTemplate = require('../../../templates/one-profile/one-profile.pug');
const profileEventsTabTemplate = require('../../../templates/profile-events-tab/profile-events-tab.pug');
const paginationBlockTemplate = require('../../../templates/pagination-block/pagination-block.pug');

export default class OneProfileView extends ProfilesBaseView {
  public globalStore: Store;

  public actions: Actions;

  constructor(globalStore: Store, actions: Actions) {
    super();
    this.globalStore = globalStore;
    this.actions = actions;
  }

  renderEventsList = (events: any) => {
    super.renderEventsList(events);

    const { currentEventsPage, currentEventsButton } = this.globalStore.oneProfileStore;

    // обновляем состояние пагинатора после отрисовки списка
    switch (currentEventsButton) {
      case profileEventsButton.planning:
        const { oneProfilePlanningEvents } = this.globalStore.oneProfileStore;
        updatePaginationState(currentEventsPage, oneProfilePlanningEvents.length);
        break;

      case profileEventsButton.visited:
        const { oneProfileVisitedEvents } = this.globalStore.oneProfileStore;
        updatePaginationState(currentEventsPage, oneProfileVisitedEvents.length);
        break;

      default:
        break;
    }
  };

  renderOneProfilePage() {
    window.scroll(0, 0);
    const { oneProfileData } = this.globalStore.oneProfileStore;
    const { currentEventsButton } = this.globalStore.oneProfileStore;
    const { oneProfilePlanningEvents } = this.globalStore.oneProfileStore;
    const { oneProfileVisitedEvents } = this.globalStore.oneProfileStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/one-profile/img/one-profile-background.jpg") no-repeat top / 100%';

    oneProfileData.age = addDeclensionOfNumbers(oneProfileData.age, ['год', 'года', 'лет']);
    oneProfileData.followersCount = addDeclensionOfNumbers(oneProfileData.followers.length, [
      'подписчик',
      'подписчика',
      'подписчиков',
    ]);

    wrapper.innerHTML = '';
    wrapper.innerHTML = oneProfileTemplate(oneProfileData);
    wrapper.querySelector('.profile-main-block').insertAdjacentHTML('beforeend', profileEventsTabTemplate());

    const { currentEventsPage } = this.globalStore.oneProfileStore;

    const ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${urlMap.imgUrl + oneProfileData.Uid}) no-repeat center / cover`;

    const eventsButtonsBlock = document.getElementById('jsEventsButtonsBlock');
    const buttons = Array.from(eventsButtonsBlock.querySelectorAll('button[data-buttontype="toggle"]'));
    buttons.forEach((button) => {
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

    // ренедерим пагинатор:
    const oneProfilePaginator = document.getElementById('paginator');
    oneProfilePaginator.innerHTML = paginationBlockTemplate();

    switch (currentEventsButton) {
      case profileEventsButton.planning:
        updatePaginationState(currentEventsPage, 1);
        break;

      case profileEventsButton.visited:
        updatePaginationState(currentEventsPage, 1);
        break;

      default:
        break;
    }

    document.getElementById('paginationBack').addEventListener('click', oneProfilePaginatorHandler.bind(this));
    document.getElementById('paginationForward').addEventListener('click', oneProfilePaginatorHandler.bind(this));
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(
      ChannelNames.oneProfileUpdated,
      this.renderOneProfilePage.bind(this),
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.oneProfilePageChanged,
      this.renderEventsList.bind(this),
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.oneProfileEventsButtonChanged,
      this.renderEventsList.bind(this),
    );
  }
}
