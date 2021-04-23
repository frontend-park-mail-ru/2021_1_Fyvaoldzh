import './css/style.scss';

import Dispatcher from './ts/dispatcher/dispatcher';
import Actions from './ts/actions/actions';
import Store from './ts/storage/store';
import EventBus from './ts/eventBus/eventBus';

import EventsView from './ts/views/EventsView/EventsView';
import OneEventView from './ts/views/OneEventView/OneEventView';
import UserView from './ts/views/UserView/UserView';
import ChangePageView from './ts/views/ChangePageView/ChangePageView';
import { ChannelNames } from './ts/config/config';
import OneProfileView from './ts/views/OneProfileView/OneProfileView';
import SearchView from './ts/views/SearchView/SearchView';
import FollowingsView from './ts/views/FollowingsView/FollowingsView';

const dispatcher = new Dispatcher(); // Диспетчер отвечает за доставку actions до хранилища
const actions = new Actions(dispatcher);
const eventBus = new EventBus();

const globalStore = new Store(eventBus);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/' }).then();
}

dispatcher.register(globalStore.reducer.bind(globalStore));

const eventsView = new EventsView(globalStore, actions);

const userView = new UserView(globalStore, actions);

const oneEventView = new OneEventView(globalStore, actions);

const searchView = new SearchView(globalStore, actions);

const followingsView = new FollowingsView(globalStore, actions);

const changePageView = new ChangePageView(
  globalStore,
  actions,
  userView,
  eventsView,
  oneEventView,
  searchView,
  followingsView,
);

const oneProfileView = new OneProfileView(globalStore, actions);

[
  eventsView,
  userView,
  oneEventView,
  changePageView,
  oneProfileView,
  searchView,
  followingsView,
].forEach((view) => view.subscribeViews());

const navbarTemplate = require('Components/navbar/navbar.pug');

function firstRender() {
  const navbar = document.getElementById('navbar');
  navbar.innerHTML = navbarTemplate({}); // Начальный навбар.
  actions.updateUser(true); // Обновляем данные пользователя в хранилище. true = первый раз
}

firstRender();

/* Как обновятся данные пользователя,
 Так мы переходим по урлу в адресной строке, так как нам надо знать, залогинен пользователь,
 или нет, чтобы скрыть от него некоторые страницы
*/
eventBus.subscribe(
  ChannelNames.firstUserUpdated,
  actions.routerChangePage.bind(actions, window.location.href),
);
eventBus.subscribe(
  ChannelNames.firstUserIsNotAuth,
  actions.routerChangePage.bind(actions, window.location.href),
);

const { body } = document;

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

body.addEventListener('click', async (e) => {
  const { target } = e;

  if (target instanceof HTMLAnchorElement) {
    e.preventDefault();

    const toUrl = new URL(target.href);
    actions.routerChangePage(toUrl.pathname + toUrl.search);
  }

  if (target instanceof HTMLButtonElement) {
    const formBody: HTMLFormElement = <HTMLFormElement>(
      document.getElementById('formBody')
    );

    if (target.id === 'postRegistration') {
      e.preventDefault();
      const dataFromForm = new FormData(formBody);

      const registrationData: RegistrationDataInterface = {
        login: <string>dataFromForm.get('login'),
        password: <string>dataFromForm.get('password'),
        name: <string>dataFromForm.get('name'),
      };

      actions.register(registrationData);
    }

    if (target.id === 'postLogin') {
      e.preventDefault();
      const dataFromForm = new FormData(formBody);

      const loginData: LoginDataInterface = {
        login: <string>dataFromForm.get('login'),
        password: <string>dataFromForm.get('password'),
      };

      actions.login(loginData);
    }

    if (target.id === 'JSsearchBarButton') {
      const searchBarInput = <HTMLInputElement>(
        document.getElementById('JSsearchBarInput')
      );
      target.classList.toggle('close');
      if (searchBarInput.classList.contains('square')) {
        searchBarInput.value = '';
      } else {
        searchBarInput.focus();
      }
      searchBarInput.classList.toggle('square');
    }
  }
});

body.addEventListener('keydown', async (e) => {
  // моя реализация отправки инпутов поиска по клику
  const { target } = e;

  if (target instanceof HTMLInputElement) {
    if (target.id === 'JSsearchBarInput') {
      if (e.key === 'Enter') {
        const tempValue = target.value;
        target.blur();
        document.getElementById('JSsearchBarButton').click();

        const toUrl = new URL('http://localhost:3000/search');
        toUrl.search = new URLSearchParams([
          ['text', tempValue],
          ['tab', ''],
          ['category', ''],
          ['page', '1'],
        ]).toString();
        actions.routerChangePage(toUrl.pathname + toUrl.search);

        // actions.searchUpdate(tempValue);
      }
    }

    if (target.id === 'searchInput') {
      if (e.key === 'Enter') {
        const searchInput = <HTMLInputElement>(
          document.getElementById('searchInput')
        );
        actions.newSearchInputData(searchInput.value);
      }
    }
  }
});

interface LoginDataInterface {
  login: string;
  password: string;
}

interface RegistrationDataInterface {
  login: string;
  password: string;
  name: string;
}

document.getElementById('wrapper').addEventListener('click', () => {
  if ((document.getElementById('toggle') as HTMLInputElement)) {
    (document.getElementById('toggle') as HTMLInputElement).checked = false;
  }
  if ((document.getElementById('JSsearchBarButton') as HTMLInputElement).classList.contains('close')) {
    (document.getElementById('JSsearchBarButton') as HTMLInputElement).classList.toggle('close');
    (document.getElementById('JSsearchBarInput') as HTMLInputElement).classList.toggle('square');
  }
});
