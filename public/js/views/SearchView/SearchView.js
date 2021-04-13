/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {channelNames, urlMap, searchButton} from '../../config/config.js';
import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  paginatorHandler,
  updatePaginationState,
} from '../utils/utils.js';
import ProfilesBaseView from '../ProfilesBaseView/ProfilesBaseView.js';

const globalStoreSymbol = Symbol('globalStoreSymbol');
const actionsSymbol = Symbol('actionsSymbol');

export default class SearchView extends ProfilesBaseView {
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

  renderSearchPage() {
    window.scroll(0, 0);
    const {searchData} = this.globalStore.searchStore;

    const wrapper = document.getElementById('wrapper');
    wrapper.style.background = 'url("templates/profile/img/profile-background.jpg") no-repeat top / 100%';

    wrapper.innerHTML = '';
    wrapper.innerHTML = searchTemplate();

    document.getElementById('searchInput').value = searchData;

    document.getElementById('jsSearchRequest').addEventListener('click', this.handleSearch.bind(this));

    const tabsBlock = document.getElementById('jsTabsBlock');
    let tabs = Array.from(tabsBlock.querySelectorAll('button[data-buttontype="toggle"]'));
    tabs.forEach(tab => {
      tab.addEventListener('click', buttonToggleHandler.bind(this));
    });

    document.getElementById(this.globalStore.searchStore.currentTab).click();

    this.renderChangingContent();
  }

  handleSearch(e) {
    this.actions.newSearchInputData(document.getElementById('searchInput').value);
  }

  renderChangingContent() {
    const {currentTab} = this.globalStore.searchStore;
    const {searchData} = this.globalStore.searchStore;
    const {searchResultEvents} = this.globalStore.searchStore;
    const {searchResultUsers} = this.globalStore.searchStore;
    const {currentEventsPage} = this.globalStore.searchStore;
    const {currentUsersPage} = this.globalStore.searchStore;
    const changingContent = document.getElementById('changing-content');
    switch (currentTab) {
      case 'eventsTab':
        changingContent.innerHTML = searchEventsTabTemplate();
        this.renderSearchEventsTab();

        const eventsPaginator = document.getElementById('paginator');
        eventsPaginator.innerHTML = paginationBlockTemplate({
          page: this.globalStore.searchStore.currentEventsPage,
        });
        updatePaginationState(currentEventsPage, searchResultEvents.length);

        break;

      case 'usersTab':
        changingContent.innerHTML = searchUsersTabTemplate();
        this.renderUsersList(searchResultUsers);
        const usersPaginator = document.getElementById('paginator');
        usersPaginator.innerHTML = paginationBlockTemplate({page: this.globalStore.searchStore.currentUsersPage});
        updatePaginationState(currentUsersPage, searchResultUsers.length);

        break;

      default:
        break;
    }
    document.getElementById('paginationBack').addEventListener('click', paginatorHandler.bind(this));
    document.getElementById('paginationForward').addEventListener('click', paginatorHandler.bind(this));
  }

  renderSearchEventsTab() {
    const {currentEventsButton} = this.globalStore.searchStore;
    const {searchResultEvents} = this.globalStore.searchStore;

    const changingContent = document.getElementById('changing-content');
    let buttons = Array.from(changingContent.querySelectorAll('button[data-buttontype="toggle"]'));
    buttons.forEach(button => {
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
    this.renderEventsList(searchResultEvents);
  }

  renderUsersList = users => {
    window.scroll(0, 0);
    const usersList = document.getElementById('users-list');
    let resultHTML = '';
    if (!users.length || (users.length === 1 && users[0] === 'Not Found')) {
      const nothingRow = document.createElement('div');
      nothingRow.className = 'profile-header';
      nothingRow.style.height = 'auto';
      nothingRow.style.alignItems = 'start';
      nothingRow.style.justifyContent = 'center';

      const thereIsNothing = document.createElement('H6');
      thereIsNothing.innerText = `Никого не найдено =(`;
      thereIsNothing.style.fontSize = '24px';
      thereIsNothing.style.textAlign = 'center';
      thereIsNothing.style.marginBottom = '30px';

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      users.forEach(user => {
        if (user !== 'Not Found') {
          user.age = addDeclensionOfNumbers(user.age, ['год', 'года', 'лет']);
          user.followers = addDeclensionOfNumbers(user.followers, ['подписчик', 'подписчика', 'подписчиков']);
          if (!user.city) {
            user.city = 'Москва';
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
  };

  subscribeViews() {
    this[globalStoreSymbol].eventBus.subscribe(channelNames.searchUpdated, this.renderSearchPage.bind(this));

    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.searchEventsButtonChanged,
      this.renderEventsList.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.searchEventsPageChanged,
      this.renderEventsList.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.searchUsersPageChanged,
      this.renderUsersList.bind(this)
    );
    this[globalStoreSymbol].eventBus.subscribe(
      channelNames.searchTabChanged,
      this.renderChangingContent.bind(this)
    );
  }
}
