'use strict';

import {Dispatcher} from './dispatcher/dispatcher.js';
import Actions from './actions/actions.js';
import Store from './storage/store.js';
import UserStore from './storage/UserStore.js';
import {EventsStore} from './storage/EventsStore.js';
import {OneEventStore} from './storage/OneEventStore.js';
import EventBus from './eventBus/eventBus.js';

import EventsView from './views/EventsView/EventsView.js';
import OneEventView from './views/OneEventView/OneEventView.js';
import UserView from './views/UserView/UserView.js';
import ChangePageView from './views/ChangePageView/ChangePageView.js';


export const dispatcher = new Dispatcher();  // Диспетчер отвечает за доставку actions до хранилища
export const actions = new Actions(dispatcher);
export const eventBus = new EventBus();

export const globalStore = new Store(eventBus);
export const userStore = new UserStore(globalStore);
export const eventsStore = new EventsStore(globalStore);
export const oneEventStore = new OneEventStore(globalStore);

const toViews = {
    globalStore: globalStore,
    userStore: userStore,
    eventsStore: eventsStore,
    oneEventStore: oneEventStore,

    actions: actions,
    eventBus: eventBus,
}

dispatcher.register(globalStore.reducer.bind(globalStore));

const eventsView = new EventsView(toViews);
eventsView.subscribeViews();

const userView = new UserView(toViews);
userView.subscribeViews();

const oneEventView = new OneEventView(toViews);
oneEventView.subscribeViews();

const changePageView = new ChangePageView(toViews);
changePageView.subscribeViews();


navbar.innerHTML = navbarTemplate({}); // Начальный навбар.
actions.updateUser(); // Обновляем данные пользователя в хранилище.
actions.changePage('events'); // Заходим на главную страницу эвентов.

const body = document.body;

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

body.addEventListener('click', async e => {
    const {target} = e;

    if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
        e.preventDefault();
        console.log('awmnsnmdwndaw');
        
        switch (target.dataset.direction) {
            case 'logout':
                actions.logout();
                break;

            case 'eventPage':
                actions.eventPage(target.id);

            default:
                actions.changePage(target.dataset.direction);
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

        /* Еще не добавленный в архитектуру старый код по изменению страницы пользователя.

        if (target.id === 'postProfile') {
            let dataSpanForm = new FormData(target.parentNode);
            if (validation(target.parentNode)) {
                let dataSpanFormJson = JSON.stringify(Object.fromEntries(dataSpanForm));
                console.log(dataSpanFormJson);
                let postProfileAnswer = await postProfileData(dataSpanFormJson);
                renderLoggedNavbar();
            }
        }

        if (target.id === 'postAvatarProfile') {
            let avatarInput = document.getElementById('imageFile');
            if (!avatarInput.value) {
                alert('Не выбран аватар');
            } else {
                let photo = avatarInput.files[0];
                let formPut = new FormData();
                formPut.append("avatar", photo);
                console.log(formPut);
                let answ = await putAvatar(formPut);
                if (answ.ok) {
                    let loginCheck = await getLoggedProfileData();
                    let profileInfo = await loginCheck.json();
                    let navbarRow = document.getElementById('navbarRow');

                    let navbarAvatar = document.getElementById('navbar-avatar');
                    let avaProfile = document.getElementById('profileAvatar');
                    
                    fetch(`${imgUrl + profileInfo.Uid}`).then((response) => response.blob()).then(blob => {
                        const reader = new FileReader() ;
                        reader.onload = function() { navbarAvatar.style.background = `url(${this.result}) no-repeat center / cover`
                                                     avaProfile.style.background = `url(${this.result}) no-repeat center / cover`};
                        reader.readAsDataURL(blob) ;
                    }) ;
                } else {
                    //alert('неведомая ошибка');
                }
            }
        }
        */
        
    }
});