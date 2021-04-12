import './css/style.scss';

import Dispatcher from './ts/dispatcher/dispatcher';
import Actions from './ts/actions/actions';
import Store from './ts/storage/store';
import EventBus from './ts/eventBus/eventBus';

import EventsView from './ts/views/EventsView/EventsView';
import OneEventView from './ts/views/OneEventView/OneEventView';
import UserView from './ts/views/UserView/UserView';
import ChangePageView from './ts/views/ChangePageView/ChangePageView';
import { channelNames } from './ts/config/config';
import SomeUserView from './ts/views/SomeUserView/SomeUserView';

const dispatcher = new Dispatcher(); // Диспетчер отвечает за доставку actions до хранилища
const actions = new Actions(dispatcher);
const eventBus = new EventBus();

const globalStore = new Store(eventBus);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('sw.js', { scope: '/' }).then(() => console.log('sw reg'));
}

dispatcher.register(globalStore.reducer.bind(globalStore));

const eventsView = new EventsView(globalStore, actions);

const userView = new UserView(globalStore, actions);

const oneEventView = new OneEventView(globalStore, actions);

const changePageView = new ChangePageView(globalStore, actions, userView, eventsView, oneEventView);

const someUserView = new SomeUserView(globalStore, actions);

[eventsView, userView, oneEventView, changePageView, someUserView].forEach((view) => view.subscribeViews());

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
eventBus.subscribe(channelNames.firstUserUpdated, actions.routerChangePage.bind(actions, window.location.href));
eventBus.subscribe(channelNames.firstUserIsNotAuth, actions.routerChangePage.bind(actions, window.location.href));

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

    switch (target.dataset.direction) {
      case 'logout':
        actions.logout();
        break;

      default:
        const toUrl = new URL(target.href);
        actions.routerChangePage(toUrl.pathname + toUrl.search);
        break;
    }
  }

  if (target instanceof HTMLButtonElement) {
    const formBody: HTMLFormElement = <HTMLFormElement>document.getElementById('formBody');

    if (target.id === 'postRegistration') {
      e.preventDefault();
      const dataFromForm = new FormData(formBody);

      const registrationData: registrationDataInterface =
            {login: <string>dataFromForm.get('login'),
            password: <string>dataFromForm.get('password'),
            name: <string>dataFromForm.get('name')};

      actions.register(registrationData);
    }

    if (target.id === 'postLogin') {
      e.preventDefault();
      const dataFromForm = new FormData(formBody);

      const loginData: loginDataInterface =
          {login: <string>dataFromForm.get('login'),
          password: <string>dataFromForm.get('password')};

      actions.login(loginData);
    }
  }
});

interface loginDataInterface {
  login: string;
  password: string;
}

interface registrationDataInterface {
  login: string;
  password: string;
  name: string;
}

