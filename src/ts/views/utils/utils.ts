import {followingsTab, searchTab} from '../../config/config';
import DateTimeFormatOptions = Intl.DateTimeFormatOptions;

/**
 * Функция для склонения слов, стоящих после чисел
 * @param {Number} number - само число
 * @param {Object} titles - массив из трёх string -
 * склонений слова в именительном падеже ед.ч., родительном падеже ед.ч., родительном падеже мн.ч.
 * @return {String} - Строка со словом в нужном склонении и пробелом впереди
 */

export const addDeclensionOfNumbers = (number: any, titles: any) => {
  if (isNaN(number)) return number;
  const cases = [2, 0, 1, 1, 1, 2];
  return `${number} ${
    titles[number % 100 > 4 && number % 100 < 20 ? 2 : cases[number % 10 < 5 ? number % 10 : 5]]
  }`;
};

/**
 * Функция-обработчик нажатия по кнопке-переключателю
 * @param {Object} event - ивент
 */

export function buttonToggleHandler(event: any) {
  const { target } = event;
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
    } else if (this.constructor.name === 'FollowingsView') {
      this.actions.followingsChangeTab(target.id);
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
 * Функция-обработчик кликов по пагинатору для страницы поиска
 * @param {Object} event - ивент
 */

export function searchPaginatorHandler(event: any) {
  const { target } = event;
  let currentPaginatorValue;

  const { currentTab, currentEventsPage, currentUsersPage } = this.globalStore.searchStore;

  if (currentTab === searchTab.events) {
    currentPaginatorValue = currentEventsPage;
  } else if (currentTab === searchTab.users) {
    currentPaginatorValue = currentUsersPage;
  }

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        this.actions.searchPageBack();
      }
      break;

    case 'paginationForward':
      this.actions.searchPageForward();
      break;

    default:
      break;
  }
}

/**
 * Функция-обработчик кликов по пагинатору для страницы чужого профиля
 * @param {Object} event - ивент
 */

export function oneProfilePaginatorHandler(event: any) {
  const { target } = event;

  const { currentEventsPage } = this.globalStore.oneProfileStore;

  const currentPaginatorValue = currentEventsPage; // вне зависимости от нажатой кнопки планируемых/посещенных ивентов
  // текущая страница выбранного раздела хранится в currentEventsPage

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        this.actions.oneProfilePageBack();
      }
      break;

    case 'paginationForward':
      this.actions.oneProfilePageForward();
      break;

    default:
      break;
  }
}

/**
 * Функция-обработчик кликов по пагинатору для страницы своего профиля
 * @param {Object} event - ивент
 */
export function profilePaginatorHandler(event: any) {
  const { target } = event;

  const { currentEventsPage } = this.globalStore.userStore;

  switch (target.id) {
    case 'paginationBack':
      if (currentEventsPage > 1) {
        this.actions.userPageBack();
      }
      break;

    case 'paginationForward':
      this.actions.userPageForward();
      break;

    default:
      break;
  }
}

/**
 * Функция-обработчик кликов по пагинатору для страницы фолловеров
 * @param {Object} event - ивент
 */

export function followingsPaginatorHandler(event: any) {
  const { target } = event;
  let currentPaginatorValue;

  const { currentTab, currentFollowedUsersPage, currentFollowersPage } = this.globalStore.followingsStore;

  if (currentTab === followingsTab.followedUsers) {
    currentPaginatorValue = currentFollowedUsersPage;
  } else if (currentTab === followingsTab.followers) {
    currentPaginatorValue = currentFollowersPage;
  }

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        this.actions.followingsPageBack();
      }
      break;

    case 'paginationForward':
      this.actions.followingsPageForward();
      break;

    default:
      break;
  }
}

/**
 * Функция, обновляющая состояние пагинатора
 * @param {Number} currentPaginatorValue - номер текущей страницы
 * @param {Number} resultsAmount - количество результатов на странице
 */

export function updatePaginationState(currentPaginatorValue: any, resultsAmount = 6) {
  const pagBack = document.getElementById('paginationBack');
  const pagForward = document.getElementById('paginationForward');
  const pagIndicator = document.getElementById('paginationCurrent');

  if (!pagBack) return;
  if (currentPaginatorValue < 2) {
    // если номер страницы = 1 или (каким-то образом) меньше, то скрываем кнопку "назад"
    pagBack.classList.add('paginator__element_hide');
  } else pagBack.classList.remove('paginator__element_hide'); // если же страница больше 1, то показываем кнопку  "назад"

  pagBack.classList.remove('paginator__element_none');
  if (resultsAmount < 6) {
    // временная заглушка, пока на бэке не реализовано возвращение кол-ва страниц - если на данной сранице меньше шести
    // результатов, то скрываем кнопку "вперед"
    pagForward.classList.add('paginator__element_hide');
  } else pagForward.classList.remove('paginator__element_hide'); // если же как минимум 6 рез-тов, то показываем кнопку "вперед"

  pagForward.classList.remove('paginator__element_none');
  if (
    pagForward.classList.contains('paginator__element_hide')
    && pagBack.classList.contains('paginator__element_hide')
  ) {
    // если обе кнопки: "назад" и "вперед" скрыты,
    pagIndicator.classList.add('paginator__element_none');
    pagForward.classList.add('paginator__element_none');
    pagBack.classList.add('paginator__element_none');
    pagForward.classList.remove('paginator__element_hide');
    pagBack.classList.remove('paginator__element_hide');
  } else pagIndicator.classList.remove('paginator__element_none'); // иначе показываем его, если он скрыт
  pagIndicator.innerText = currentPaginatorValue; // обновляем значение в пагинаторе
}

/**
 * Функция-обработчик нажатий кнопку поиска в навбаре
 * @param {Object} event - ивент
 */

export function searchBarHandler(event: any) {
  const { target } = event;
  const searchBarinput = document.getElementById('JSsearchBarInput');
  target.classList.toggle('close');
  searchBarinput.classList.toggle('square');
}

// /**
//  * Функция-парсер даты
//  * @param {String} dateInput - входная дата
//  * @return {String} - Распарсенная дата, либо входная дата, если она передана не полной (не содержит "UTC")
//  */
//
// export function parseDate(dateInput: any) {  //реализация Димы
//   if (dateInput.includes('UTC')) {
//     const date = new Date(Date.parse(dateInput));
//     /* const options = {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//       timezone: 'UTC',
//       hour: 'numeric',
//       minute: 'numeric',
//     };
//     */
//
//     return date.toLocaleString('ru');
//   }
//   return dateInput;
// }

/**
 * Функция-парсер даты
 * @param {String} dateInput - входная дата
 * @return {String} - Распарсенная дата, либо входная дата, если она передана не полной (не содержит "UTC")
 */

export function parseDate(dateInput: any) {
  if (dateInput.includes('UTC')) {
    const date = new Date(Date.parse(dateInput));
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      timezone: 'UTC',
      hour: 'numeric',
      minute: 'numeric',
    };
    return date.toLocaleString('ru', <DateTimeFormatOptions>options);
  }
  return dateInput;
}

export function searchButtonHandler(e: any) {
  e.preventDefault();

  const input = document.getElementById('jsNavbarSearchInput') as HTMLInputElement;
  this.actions.routerChangePage(`/search?tab=${input.value}`);
}

export function searchKeyPress(e: any) {
  if (e.keyCode === 13) {
    const input = document.getElementById('jsNavbarSearchInput') as HTMLInputElement;
    this.actions.routerChangePage(`/search?tab=${input.value}`);
  }
}
