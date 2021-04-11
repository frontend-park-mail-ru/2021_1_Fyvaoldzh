/* eslint-disable no-undef */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
import {channelNames} from '../../config/config.js';
import {addDeclensionOfNumbers, buttonToggleHandler} from '../utils/utils.js';
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
    wrapper.innerHTML = searchTemplate(searchData);

    document.getElementById('searchInput').addEventListener('submit', () => {
      alert('hello');
    });

    const tabsBlock = document.getElementById('jsTabsBlock');
    let tabs = Array.from(tabsBlock.querySelectorAll('button[data-buttontype="toggle"]'));
    tabs.forEach(tab => {
      tab.addEventListener('click', buttonToggleHandler.bind(this));
    });

    this.renderChangingContent();
  }

  renderChangingContent() {
    const {currentTab} = this.globalStore.searchStore;
    const {searchData} = this.globalStore.searchStore;
    const {searchResultUsers} = this.globalStore.searchStore;
    const changingContent = document.getElementById('changing-content');

    switch (currentTab) {
      case 'eventsTab':
        changingContent.innerHTML = searchEventsTabTemplate();
        this.renderSearchEventsTab();
        break;

      case 'usersTab':
        changingContent.innerHTML = searchUsersTabTemplate();
        this.renderUsersList(searchResultUsers);
        break;

      default:
        break;
    }
  }

  renderSearchEventsTab() {
    const {currentEventsButton} = this.globalStore.searchStore;
    const {searchResultEvents} = this.globalStore.searchStore;

    const changingContent = document.getElementById('changing-content');
    let buttons = Array.from(changingContent.querySelectorAll('button[data-buttontype="toggle"]'));
    buttons.forEach(button => {
      button.addEventListener('click', buttonToggleHandler.bind(this));
    });

    switch (currentEventsButton) {
      case 'exhibitionButton':
        this.renderEventsList(searchResultEvents);
        break;

      case 'concertButton':
        this.renderEventsList([]);
        break;

      case 'theatreButton':
        this.renderEventsList([]);
        break;

      case 'entertainmentButton':
        this.renderEventsList([]);
        break;

      case 'trainingButton':
        this.renderEventsList([]);
        break;

      case 'movieButton':
        this.renderEventsList([]);
        break;

      case 'festivalButton':
        this.renderEventsList([]);
        break;

      case 'excursionButton':
        this.renderEventsList([]);
        break;

      default:
        break;
    }
  }

  renderUsersList = users => {
    const usersList = document.getElementById('users-list');
    let resultHTML = '';
    if (!users.length) {
      const nothingRow = document.createElement('div');
      nothingRow.className = 'profile-header';
      nothingRow.style.height = 'auto';
      nothingRow.style.alignItems = 'start';
      nothingRow.style.justifyContent = 'center';

      const thereIsNothing = document.createElement('H6');
      thereIsNothing.innerText = `Тут пока пусто =(`;
      thereIsNothing.style.fontSize = '24px';
      thereIsNothing.style.textAlign = 'center';
      thereIsNothing.style.marginBottom = '30px';

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      users.forEach(user => {
        user.age += addDeclensionOfNumbers(user.age, ['год', 'года', 'лет']);
        user.followers += addDeclensionOfNumbers(user.followers, ['подписчик', 'подписчика', 'подписчиков']);
        if (!user.city) {
          user.city = 'Хзвиль';
        }
        resultHTML += oneUserBlockTemplate(user);
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
      channelNames.searchTabChanged,
      this.renderChangingContent.bind(this)
    );
  }
}
