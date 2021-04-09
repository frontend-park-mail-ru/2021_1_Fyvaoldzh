import Dispatcher from './dispatcher/dispatcher.js';
import Actions from './actions/actions.js';
import Store from './storage/store.js';
import EventBus from './eventBus/eventBus.js';

import EventsView from './views/EventsView/EventsView.js';
import OneEventView from './views/OneEventView/OneEventView.js';
import UserView from './views/UserView/UserView.js';
import ChangePageView from './views/ChangePageView/ChangePageView.js';
import OneProfileView from './views/OneProfileView/OneProfileView.js';
import { channelNames } from './config/config.js';

export const dispatcher = new Dispatcher(); // Диспетчер отвечает за доставку actions до хранилища
export const actions = new Actions(dispatcher);
export const eventBus = new EventBus();

export const globalStore = new Store(eventBus);

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

[eventsView, userView, oneEventView, changePageView, oneProfileView].forEach((view) => view.subscribeViews());

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

window.onpopstate = () => actions.routerChangePage(document.location);

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

  if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
    e.preventDefault();

    switch (target.dataset.direction) {
      case 'logout':
        actions.logout();
        break;

      default:
        const toUrl = new URL(target.href);
        actions.routerChangePage(toUrl.pathname);
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
  }
});
