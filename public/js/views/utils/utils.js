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
 * Функция-обработчик кликов по пагинатору для страницы поиска
 * @param {Object} event - ивент
 */

export function searchPaginatorHandler(event) {
  const {target} = event;
  let currentPaginatorValue;

  const {currentTab, currentEventsPage, currentUsersPage} = this.globalStore.searchStore;

  if (currentTab === searchTab.events) {
    currentPaginatorValue = currentEventsPage;
  } else if (currentTab === searchTab.users) {
    currentPaginatorValue = currentUsersPage;
  }

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        //если текущая страница не 1, то обрабатываем клик по кнопке "назад" (если 1, то она все равно скрыта, но лишняя проверка не помешает)
        this.actions.searchPageBack();
      }
      break;

    case 'paginationForward':
      this.actions.searchPageForward();
      break;
  }
}

/**
 * Функция-обработчик кликов по пагинатору для страницы чужого профиля
 * @param {Object} event - ивент
 */

export function oneProfilePaginatorHandler(event) {
  const {target} = event;
  let currentPaginatorValue;

  const {currentEventsPage} = this.globalStore.oneProfileStore;

  currentPaginatorValue = currentEventsPage; //вне зависимости от нажатой кнопки планируемых/посещенных ивентов
  // текущая страница выбранного раздела хранится в currentEventsPage

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        //если текущая страница не 1, то обрабатываем клик по кнопке "назад" (если 1, то она все равно скрыта, но лишняя проверка не помешает)
        this.actions.oneProfilePageBack();
      }
      break;

    case 'paginationForward':
      this.actions.oneProfilePageForward();
      break;
  }
}

/**
 * Функция-обработчик кликов по пагинатору для страницы своего профиля
 * @param {Object} event - ивент
 */
export function profilePaginatorHandler(event) {
  const {target} = event;
  let currentPaginatorValue;

  const {currentEventsPage} = this.globalStore.userStore;

  currentPaginatorValue = currentEventsPage; //вне зависимости от нажатой кнопки планируемых/посещенных ивентов
  // текущая страница выбранного раздела хранится в currentEventsPage

  switch (target.id) {
    case 'paginationBack':
      if (currentPaginatorValue > 1) {
        //если текущая страница не 1, то обрабатываем клик по кнопке "назад" (если 1, то она все равно скрыта, но дополнительная проверка не помешает)
        this.actions.userPageBack();
      }
      break;

    case 'paginationForward':
      this.actions.userPageForward();
      break;
  }
}

/**
 * Функция, обновляющая состояние пагинатора
 * @param {Number} currentPaginatorValue - номер текущей страницы
 * @param {Number} resultsAmount - количество результатов на странице
 */

export function updatePaginationState(currentPaginatorValue, resultsAmount = 6) {
  const pagBack = document.getElementById('paginationBack');
  const pagForward = document.getElementById('paginationForward');
  const pagIndicator = document.getElementById('paginationCurrent');

  if (!pagBack) return;
  if (currentPaginatorValue < 2) {
    //если страница 1 или (каким-то образом) меньше, то скрываем кнопку "назад", если она еще не скрыта
    if (!pagBack.classList.contains('paginator__element_hide')) {
      pagBack.classList.add('paginator__element_hide');
    }
  } else if (pagBack.classList.contains('paginator__element_hide')) {
    //если же страница больше 1, то, если кнопка "назад" скрыта, показываем её
    pagBack.classList.remove('paginator__element_hide');
  }

  if (resultsAmount < 6) {
    //временная заглушка, пока на бэке не реализовано возвращение кол-ва страниц - если на данной сранице меньше шести
    // результатов, то скрываем кнопку "вперед", если она еще не скрыта
    if (!pagForward.classList.contains('paginator__element_hide')) {
      pagForward.classList.add('paginator__element_hide');
    }
  } else if (pagForward.classList.contains('paginator__element_hide')) {
    //если же как минимум 6 рез-тов, то показываем кнопку "вперед", если она скрыта
    pagForward.classList.remove('paginator__element_hide');
  }

  if (
    pagForward.classList.contains('paginator__element_hide') &&
    pagBack.classList.contains('paginator__element_hide')
  ) {
    //если обе кнопки: "назад" и "вперед" скрыты,
    //то скрываем и блок с номером страницы - т.к. он в любом случае будет содержать только "1"
    if (!pagIndicator.classList.contains('paginator__element_hide')) {
      pagIndicator.classList.add('paginator__element_hide');
    }
  } else if (pagIndicator.classList.contains('paginator__element_hide')) {
    //иначе показываем его, если он скрыт
    pagIndicator.classList.remove('paginator__element_hide');
  }

  pagIndicator.innerText = currentPaginatorValue; //обновляем значение в пагинаторе
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
