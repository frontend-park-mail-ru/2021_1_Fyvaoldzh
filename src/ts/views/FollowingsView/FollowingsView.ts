import { ChannelNames, followingsTab } from '../../config/config';
import Store from '../../storage/store';
import Actions from '../../actions/actions';

import {
  addDeclensionOfNumbers,
  buttonToggleHandler,
  followingsPaginatorHandler,
  updatePaginationState,
} from '../utils/utils';

const oneUserBlockTemplate = require('Templates/one-user-block/one-user-block.pug');
const followingsTemplate = require('Templates/followings/followings.pug');
const paginationBlockTemplate = require('Templates/pagination-block/pagination-block.pug');

export default class FollowingsView {
  public globalStore: Store;

  public actions: Actions;

  public wrapper: HTMLElement;

  constructor(globalStore: Store, actions: Actions) {
    this.globalStore = globalStore;
    this.actions = actions;
    this.wrapper = document.getElementById('wrapper');
  }

  renderFollowingsPage() {
    window.scroll(0, 0);
    const { currentTab } = this.globalStore.followingsStore;

    this.wrapper.style.background = 'url("templates/profile/img/profile-background.jpg") no-repeat top / 100%';
    this.wrapper.style.paddingTop = '0px';
    this.wrapper.style.paddingBottom = '0px';

    this.wrapper.innerHTML = '';
    this.wrapper.innerHTML = followingsTemplate(this.globalStore.followingsStore.inspectedProfileData);

    const row = <HTMLElement>document.querySelector('.row'); // моя реализация
    row.style.width = '100%';

    const tabsBlock = document.getElementById('jsTabsBlock');
    const tabs = Array.from(tabsBlock.querySelectorAll('button[data-buttontype="toggle"]'));
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

    this.renderUsersList();
  }

  handleSearch() {
    this.actions.newSearchInputData((<HTMLInputElement>document.getElementById('searchInput')).value);
  }

  renderUsersList() {
    window.scroll(0, 0);
    const { currentTab } = this.globalStore.followingsStore;
    let usersArray;

    switch (currentTab) {
      case followingsTab.followedUsers:
        usersArray = this.globalStore.followingsStore.followedUsers;
        break;
      case followingsTab.followers:
        usersArray = this.globalStore.followingsStore.followers;
        break;
    }

    const usersList = document.getElementById('users-list');
    let resultHTML = '';
    if (!usersArray.length || (usersArray.length === 1 && usersArray[0] === 'Not Found')) {
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

      nothingRow.appendChild(thereIsNothing);

      const externalElement = document.createElement('div');
      externalElement.appendChild(nothingRow);

      resultHTML = externalElement.innerHTML;
    } else {
      usersArray.forEach((user) => {
        if (user !== 'Not Found') {
          user.age = addDeclensionOfNumbers(user.age, ['год', 'года', 'лет']);
          if (user.age === '0 лет') {
            user.age = 'Не указан';
          }
          user.followers = addDeclensionOfNumbers(user.followers, ['подписчик', 'подписчика', 'подписчиков']);
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
    const usersPaginator = document.getElementById('paginator');
    usersPaginator.innerHTML = paginationBlockTemplate();

    switch (currentTab) {
      case followingsTab.followedUsers:
        const { currentFollowedUsersPage } = this.globalStore.followingsStore;
        updatePaginationState(currentFollowedUsersPage, usersArray.length); // обновляем состояние пагинатора после отрисовки
        // основной части странички
        break;
      case followingsTab.followers:
        const { currentFollowersPage } = this.globalStore.followingsStore;
        updatePaginationState(currentFollowersPage, usersArray.length); // обновляем состояние пагинатора после отрисовки
        // основной части странички
        break;
    }

    document.getElementById('paginationBack').addEventListener('click', followingsPaginatorHandler.bind(this));
    document.getElementById('paginationForward').addEventListener('click', followingsPaginatorHandler.bind(this));
  }

  subscribeViews() {
    this.globalStore.eventBus.subscribe(ChannelNames.followingsUpdated, this.renderFollowingsPage.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.followingsTabChanged, this.renderUsersList.bind(this));
    this.globalStore.eventBus.subscribe(ChannelNames.followingsPageChanged, this.renderUsersList.bind(this));
  }
}
