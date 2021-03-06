import {
  ChannelNames,
} from '../../config/config';
import Store from '../../storage/store';
import Actions from '../../actions/actions';

import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  searchPaginatorHandler,
  updatePaginationState,
} from '../utils/utils';

import ProfilesBaseView from '../ProfilesBaseView/ProfilesBaseView';

const searchTemplate = require('Templates/search/search.pug');
const searchEventsTabTemplate = require('Templates/search-events-tab/search-events-tab.pug');
const searchUsersTabTemplate = require('Templates/search-users-tab/search-users-tab.pug');
const paginationBlockTemplate = require('Templates/pagination-block/pagination-block.pug');
const oneUserBlockTemplate = require('Templates/one-user-block/one-user-block.pug');
const searchLoaderTemplate = require('Templates/search-loader/search-loader.pug');

export default class SearchView extends ProfilesBaseView {
  public globalStore: Store;

  public actions: Actions;

  public wrapper: HTMLElement;

  constructor(globalStore: Store, actions: Actions) {
    super();
    this.globalStore = globalStore;
    this.actions = actions;
    this.wrapper = document.getElementById('wrapper');
  }

  renderEventsList() {
    const { searchResultEvents } = this.globalStore.searchStore;
    super.renderEventsList(searchResultEvents);

    // т.к. renderEventsList может быть только на вкладке поиска ивентов, результаты вкладки поиска пользователей не чекаем:
    const { currentEventsPage } = this.globalStore.searchStore;
    updatePaginationState(currentEventsPage, searchResultEvents.length); // обновляем состояние пагинатора после отрисовки
    // основной части странички
  }

  renderSearchPage() {
    window.scroll(0, 0);
    const { searchData } = this.globalStore.searchStore;
    const { currentTab } = this.globalStore.searchStore;
    document.title = 'Поиск';

    this.wrapper.style.background = 'url("templates/profile/img/profile-background.jpg") no-repeat top / 100%';
    if (window.screen.width <= 767) {
      this.wrapper.style.paddingTop = '0px';
      this.wrapper.style.paddingBottom = '0px';
    }

    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = searchTemplate();

    const row = <HTMLElement>document.querySelector('.row'); // моя реализация
    row.style.width = '100%';

    (<HTMLInputElement>(
      document.getElementById('searchInput')
    )).value = searchData;

    document
      .getElementById('jsSearchRequest')
      .addEventListener('click', this.handleSearch.bind(this));

    const tabsBlock = document.getElementById('jsTabsBlock');
    const tabs = Array.from(
      tabsBlock.querySelectorAll('button[data-buttontype="toggle"]'),
    );
    tabs.forEach((tab) => {
      tab.addEventListener('click', buttonToggleHandler.bind(this));

      switch (tab.id) {
        case currentTab:
          tab.classList.add('tab-active');
          tab.classList.remove('tab-inactive');
          break;

        default:
          tab.classList.add('tab-inactive');
          tab.classList.remove('tab-active');
          break;
      }
    });

    // document.getElementById(this.globalStore.searchStore.currentTab).click();
    this.renderChangingContent();
  }

  handleSearch() {
    this.actions.newSearchInputData(
      (<HTMLInputElement>document.getElementById('searchInput')).value,
    );
  }

  renderChangingContent() {
    const { currentTab } = this.globalStore.searchStore;
    const { searchResultEvents } = this.globalStore.searchStore;
    const { searchResultUsers } = this.globalStore.searchStore;
    const { currentEventsPage } = this.globalStore.searchStore;
    const { currentUsersPage } = this.globalStore.searchStore;
    const changingContent = document.getElementById('changing-content');
    switch (currentTab) {
      case 'eventsTab':
        changingContent.innerHTML = searchEventsTabTemplate();
        this.renderSearchEventsTab();

        const eventsPaginator = document.getElementById('paginator');
        eventsPaginator.innerHTML = paginationBlockTemplate();
        updatePaginationState(currentEventsPage, searchResultEvents.length);

        break;

      case 'usersTab':
        changingContent.innerHTML = searchUsersTabTemplate();
        this.renderUsersList();
        const usersPaginator = document.getElementById('paginator');
        usersPaginator.innerHTML = paginationBlockTemplate();
        updatePaginationState(currentUsersPage, searchResultUsers.length);
        break;

      default:
        break;
    }
    document
      .getElementById('paginationBack')
      .addEventListener('click', searchPaginatorHandler.bind(this));
    document
      .getElementById('paginationForward')
      .addEventListener('click', searchPaginatorHandler.bind(this));
  }

  renderSearchEventsTab() {
    const { currentEventsButton } = this.globalStore.searchStore;

    const changingContent = document.getElementById('changing-content');

    const buttons = Array.from(
      changingContent.querySelectorAll('button[data-buttontype="toggle"]'),
    );
    buttons.forEach((button) => {
      button.addEventListener('click', buttonToggleHandler.bind(this));
      switch (button.id) {
        case currentEventsButton:
          button.classList.add('button-active');
          button.classList.remove('button-inactive');
          break;

        default:
          button.classList.add('button-inactive');
          button.classList.remove('button-active');
          break;
      }
    });
    this.renderEventsList();
  }

  renderUsersList() {
    window.scroll(0, 0);
    const { searchResultUsers } = this.globalStore.searchStore;
    const usersList = document.getElementById('users-list');
    let resultHTML = '';
    if (!searchResultUsers.length || (searchResultUsers.length === 1 && searchResultUsers[0] === 'Not Found')) {
      const nothingRow = document.createElement('div');
      nothingRow.className = 'profile-header';
      nothingRow.style.height = 'auto';
      nothingRow.style.alignItems = 'start';
      nothingRow.style.justifyContent = 'center';

      const thereIsNothing = document.createElement('H6');
      thereIsNothing.innerText = 'Никого не найдено =(';
      thereIsNothing.style.fontSize = '24px';
      thereIsNothing.style.textAlign = 'center';
      thereIsNothing.style.marginBottom = '30px';
      thereIsNothing.style.alignSelf = 'center';

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      searchResultUsers.forEach((user) => {
        if (user !== 'Not Found') {
          user.age = addDeclensionOfNumbers(user.age, ['год', 'года', 'лет']);
          if (user.age === '0 лет') {
            user.age = 'Не указан';
          }
          user.followers = addDeclensionOfNumbers(user.followers, [
            'подписчик',
            'подписчика',
            'подписчиков',
          ]);
          // пока бэк не отдает город, возраст и подписчиков для юзеров в поиске, заглушки:
          if (!user.city) {
            user.city = 'Не указан';
          }
          if (!user.age) {
            user.age = '19 лет';
          }
          if (!user.followers) {
            user.followers = '12 подписчиков';
          }
          resultHTML += oneUserBlockTemplate(user);
        }
      });
    }
    usersList.innerHTML = resultHTML;
    // т.к. renderUsersList может быть только на вкладке поиска пользователей, результаты вкладки поиска ивентов не чекаем:
    const { currentUsersPage } = this.globalStore.searchStore;
    updatePaginationState(currentUsersPage, searchResultUsers.length); // обновляем состояние пагинатора после отрисовки
    // основной части странички
  }

  renderSearchLoader() {
    const eventsList = document.getElementById('events-list');
    const usersList = document.getElementById('users-list');

    updatePaginationState(1, 1);

    if (eventsList !== null) {
      eventsList.innerHTML = searchLoaderTemplate();
    }
    if (usersList !== null) {
      usersList.innerHTML = searchLoaderTemplate();
    }
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchUpdated,
      this.renderSearchPage.bind(this),
    );

    this.globalStore.eventBus.subscribe(
      ChannelNames.searchEventsButtonChanged,
      this.renderEventsList.bind(this),
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchEventsPageChanged,
      this.renderEventsList.bind(this),
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchUsersPageChanged,
      this.renderUsersList.bind(this),
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchTabChanged,
      this.renderChangingContent.bind(this),
    );
    this.globalStore.eventBus.subscribe(
      ChannelNames.searchLoaderActivate,
      this.renderSearchLoader.bind(this),
    );
  }
}
