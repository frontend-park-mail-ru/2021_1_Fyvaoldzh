import Dispatcher from './dispatcher/dispatcher.js';
import Actions from './actions/actions.js';
import Store from './storage/store.js';
import UserStore from './storage/UserStore.js';
import EventsStore from './storage/EventsStore.js';
import OneEventStore from './storage/OneEventStore.js';
import OneProfileStore from './storage/OneProfileStore.js';
import SearchStore from './storage/SearchStore.js';
import EventBus from './eventBus/eventBus.js';

import EventsView from './views/EventsView/EventsView.js';
import OneEventView from './views/OneEventView/OneEventView.js';
import UserView from './views/UserView/UserView.js';
import ChangePageView from './views/ChangePageView/ChangePageView.js';
import OneProfileView from './views/OneProfileView/OneProfileView.js';
import SearchView from './views/SearchView/SearchView.js';

export const dispatcher = new Dispatcher(); // Диспетчер отвечает за доставку actions до хранилища
export const actions = new Actions(dispatcher);
export const eventBus = new EventBus();

export const globalStore = new Store(eventBus);
export const userStore = new UserStore(globalStore);
export const eventsStore = new EventsStore(globalStore);
export const oneEventStore = new OneEventStore(globalStore);
export const oneProfileStore = new OneProfileStore(globalStore);
export const searchStore = new SearchStore(globalStore);

const toViews = {
  globalStore,
  actions,
};

dispatcher.register(globalStore.reducer.bind(globalStore));

const eventsView = new EventsView(toViews);

const userView = new UserView(toViews);

const oneEventView = new OneEventView(toViews);

const changePageView = new ChangePageView(toViews);

const oneProfileView = new OneProfileView(toViews);

const searchView = new SearchView(toViews);

[eventsView, userView, oneEventView, changePageView, oneProfileView, searchView].forEach(view =>
  view.subscribeViews()
);

function firstRender() {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = navbarTemplate({}); // Начальный навбар.
  actions.updateUser(); // Обновляем данные пользователя в хранилище.
  actions.changePage('events'); // Заходим на главную страницу эвентов.
}

firstRender();

const {body} = document;

/* Заготовка для скрытия навбара по клику куда-либо

    const navbarCheckbox = document.getElementById('toggle');
    //console.log(Object.prototype.toString.call(target)); отладочная фыгня

    if (Object.prototype.toString.call(target) !== '[object HTMLInputElement]') {
        // Сворачивание открытого профиля навбарчика при нажатии куда-либо
        navbarCheckbox.checked = false;
    }

    if (Object.prototype.toString.call(target) === '[object HTMLInputElement]') {
        console.log(navbarCheckbox.checked)
        navbarCheckbox.checked = !navbarCheckbox.checked;
    }
*/

// const searchBarButton = document.getElementById('JSsearchBarButton'); //Достаем кнопку бара поиска.
// searchBarButton.addEventListener('click', searchBarHandler); //Вешаем на нее обработчик клика.
//
// let searchBarInput = document.getElementById('JSsearchBarInput');
// console.log(searchBarInput);
// searchBarInput.addEventListener('click', e => {
//   if (e.key === 'Enter') {
//     // e.preventDefault();
//     alert('pressed');
//     // Do more work
//   }
// });

body.addEventListener('click', async e => {
  const {target} = e;

  if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
    e.preventDefault();

    switch (
      target.dataset.direction //значение поля с текущей страничкой обновляется только при default?
    ) {
      case 'logout':
        actions.logout();
        break;

      case 'eventPage':
        actions.eventPage(target.id);
        break;

      case 'oneProfile':
        actions.updateOneProfile(target.id);
        break;

      case 'search':
        actions.searchUpdate('');
        break;

      default:
        actions.changePage(target.dataset.direction);
        break;
    }
  }

  if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
    const formBody = document.getElementById('formBody');

    if (target.id === 'postRegistration') {
      e.preventDefault();
      const dataFromForm = new FormData(formBody);
      const objectDataForm = Object.fromEntries(dataFromForm);
      actions.register(objectDataForm);
    }

    if (target.id === 'postLogin') {
      e.preventDefault();
      const dataFromForm = new FormData(formBody);
      const objectDataForm = Object.fromEntries(dataFromForm);
      actions.login(objectDataForm);
    }

    if (target.id === 'JSsearchBarButton') {
      const searchBarInput = document.getElementById('JSsearchBarInput');
      target.classList.toggle('close');
      if (searchBarInput.classList.contains('square')) {
        searchBarInput.value = '';
      }
      searchBarInput.classList.toggle('square');
    }
  }
});

body.addEventListener('keydown', async e => {
  const {target} = e;

  if (Object.prototype.toString.call(target) === '[object HTMLInputElement]') {
    if (target.id === 'JSsearchBarInput') {
      if (e.key === 'Enter') {
        const tempValue = target.value;
        target.blur();
        document.getElementById('JSsearchBarButton').click();
        actions.searchUpdate(tempValue);
      }
    }

    if (target.id === 'searchInput') {
      if (e.key === 'Enter') {
        actions.newSearchInputData(document.getElementById('searchInput').value);
      }
    }
  }
});
