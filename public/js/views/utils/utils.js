import {searchTab, searchButton, profileEventsButton} from '../../config/config.js';

/**
 * Функция для склонения слов, стоящих после чисел
 * @param {Number} number - само число
 * @param {Object} titles - массив из трёх string - склонений слова в именительном падеже ед.ч., родительном падеже ед.ч., родительном падеже мн.ч.
 * @return {String} - Строка со словом в нужном склонении и пробелом впереди
 */

export const addDeclensionOfNumbers = (number, titles) => {
  if (isNaN(number)) return number;
  const cases = [2, 0, 1, 1, 1, 2];
  return (
    number + ' ' + titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
  );
};

/**
 * Функция-обработчик нажатия по кнопке-переключателю
 * @param {Object} event - ивент
 */

export function buttonToggleHandler(event) {
  const {target} = event;
  if (target.classList.contains('tab-inactive')) {
    const curActiveElem = target.parentNode.querySelector('.tab-active');
    curActiveElem.classList.add('tab-inactive');
    target.classList.add('tab-active');
    target.classList.remove('tab-inactive');
    curActiveElem.classList.remove('tab-active');
    if (this.constructor.name === 'UserView') {
      this.actions.changeTab(target.id);
    } else if (this.constructor.name === 'SearchView') {
      this.actions.searchChangeTab(target.id);
    }
  }

  if (target.classList.contains('button-inactive')) {
    const curActiveElem = target.parentNode.querySelector('.button-active');
    curActiveElem.classList.add('button-inactive');
    target.classList.add('button-active');
    target.classList.remove('button-inactive');
    curActiveElem.classList.remove('button-active');

    if (this.constructor.name === 'UserView') {
      this.actions.changeUserEventsButton(target.id);
    } else if (this.constructor.name === 'OneProfileView') {
      this.actions.changeOneProfileEventsButton(target.id);
    } else if (this.constructor.name === 'SearchView') {
      this.actions.changeSearchEventsButton(target.id);
    }
  }
}

/**
 * Функция-обработчик нажатий на пагинатор
 * @param {Object} event - ивент
 */

export function paginatorHandler(event) {
  const {target} = event;
  let currentPaginatorValue;
  let resultsAmount, pagBackAction, pagForwardAction;

  switch (this.constructor.name) {
    case 'SearchView': {
      // const {currentTab} = this.globalStore.searchStore;
      const {
        currentTab,
        currentEventsPage,
        currentUsersPage,
        searchResultEvents,
        searchResultUsers,
      } = this.globalStore.searchStore;
      // pagBackAction = this.actions.searchPageBack.bind(this.globalStore.SearchView);
      // pagForwardAction = this.actions.searchPageForward.bind(this.globalStore.SearchView);

      if (currentTab === searchTab.events) {
        currentPaginatorValue = currentEventsPage;
        resultsAmount = searchResultEvents.length;
      } else if (currentTab === searchTab.users) {
        currentPaginatorValue = currentUsersPage;
        resultsAmount = searchResultUsers.length;
      }
      break;
    }

    case 'OneProfileView': {
      const {
        currentEventsPage,
        currentEventsButton,
        oneProfilePlanningEvents,
        oneProfileVisitedEvents,
      } = this.globalStore.oneProfileStore;
      // pagBackAction = this.actions.oneProfilePageBack.bind(this.globalStore.OneProfileView);
      // pagForwardAction = this.actions.oneProfilePageForward.bind(this.globalStore.OneProfileView);
      currentPaginatorValue = currentEventsPage;

      if (currentEventsButton === profileEventsButton.planning) {
        resultsAmount = oneProfilePlanningEvents.length;
      } else if (currentEventsButton === profileEventsButton.visited) {
        resultsAmount = oneProfileVisitedEvents.length;
      }
      break;
    }
  }

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        updatePaginationState(currentPaginatorValue, resultsAmount); //было --currentPaginatorValue
        if (this.constructor.name === 'SearchView') {
          this.actions.searchPageBack();
        } else if (this.constructor.name === 'OneProfileView') {
          this.actions.oneProfilePageBack();
        }
      }
      break;

    case 'paginationForward':
      updatePaginationState(currentPaginatorValue, resultsAmount); //было ++currentPaginatorValue
      if (this.constructor.name === 'SearchView') {
        this.actions.searchPageForward();
      } else if (this.constructor.name === 'OneProfileView') {
        this.actions.oneProfilePageForward();
      }
      break;
  }
}

/**
 * Функция, обновляющая состояние пагинатора
 * @param {Number} currentPaginatorValue - номер текущей страницы
 * @param {Number} resultsAmount - количество результатов на странице
 */

export function updatePaginationState(currentPaginatorValue, resultsAmount = 6) {
  console.log(resultsAmount);
  const pagBack = document.getElementById('paginationBack');
  const pagForward = document.getElementById('paginationForward');

  if (!pagBack) return;
  if (currentPaginatorValue < 2) {
    if (!pagBack.classList.contains('paginator__element_hide')) {
      pagBack.classList.add('paginator__element_hide');
    }
  } else if (pagBack.classList.contains('paginator__element_hide')) {
    pagBack.classList.remove('paginator__element_hide');
  }

  if (resultsAmount < 6) {
    if (!pagForward.classList.contains('paginator__element_hide')) {
      pagForward.classList.add('paginator__element_hide');
    }
  } else if (pagForward.classList.contains('paginator__element_hide')) {
    pagForward.classList.remove('paginator__element_hide');
  }

  document.getElementById('paginationCurrent').innerText = currentPaginatorValue;
}

/**
 * Функция-обработчик нажатий кнопку поиска в навбаре
 * @param {Object} event - ивент
 */

export function searchBarHandler(event) {
  const {target} = event;
  const searchBarinput = document.getElementById('JSsearchBarInput');
  target.classList.toggle('close');
  searchBarinput.classList.toggle('square');
}
