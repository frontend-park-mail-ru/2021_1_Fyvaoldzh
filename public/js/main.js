'use strict';

import {getAllEventsJson, getLoggedProfileData, postProfileData, putAvatar} from './networkModule/network.js';
import {getEventById} from './networkModule/network.js';
import {postRegistationData} from './networkModule/network.js';
import {postLoginData} from './networkModule/network.js';
import {logoutFunc} from './networkModule/network.js';
import validation from './validationModule/inputValidation.js';

const imgUrl = 'http://95.163.180.8:1323/api/v1/avatar/';

class eventComponent {
    constructor({
        parent = document.body,
        data = {},
    }) {
        this._parent = parent;
        this._data = data;
    }

    render() {
        const template = oneTableEventTemplate(this._data);
        this._parent.insertAdjacentHTML('beforeend', template)
    }
}

const wrapper = document.getElementById('wrapper');


//wrapper.innerHTML = upperTextTemplate({});

const body = document.body;

const urlMap = {
    main: renderEvents,
    signup: renderSignUp,
    back: renderEvents,
    eventPage: renderEventPage,
    login: renderLoginPage,
    profile: renderMyProfilePage,
    logout: renderLogout,
}

/**
 * Функция для построения страницы ивентов
 */

async function renderEvents() {
    wrapper.innerHTML = '';
    wrapper.style.background = 'url("templates/events/img/events-background.jpg") no-repeat';
    wrapper.innerHTML = upperTextTemplate({});

    const eventsRow = document.getElementById('events-row');
    
    let eventsJson = await getAllEventsJson();
    for (let i in eventsJson) {
        const innerEvent = new eventComponent({parent: eventsRow, data: eventsJson[i]});
        innerEvent.render();
    }
}

/**
 * Функция построения страницы регистрации
 */

function renderSignUp() {
    wrapper.style.background =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = signUpFormTemplate({});
}

/**
 * Функция для регистрации
 * @param {string} type - тип события
 * @return {Promise<void>} listener - обработчик события
 */

body.addEventListener('click', async e => {
    const {target} = e;
    console.log(Object.prototype.toString.call(target));

    if (Object.prototype.toString.call(target) === '[object HTMLAnchorElement]') {
        e.preventDefault();
        urlMap[target.dataset.direction](target.dataset.eventid);
    }

    if (Object.prototype.toString.call(target) === '[object HTMLButtonElement]') {
        e.preventDefault();
        const formBody = document.getElementById('formBody');

        console.log(Object.prototype.toString.call(formBody));
        

        
        if (target.id === 'postRegistration') {
            let dataFromForm = new FormData(formBody);
            if (validation(formBody)) {
                console.log(validation(formBody));
                let jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
                let answer = await postRegistationData(jsonData);
                if (answer.ok) {
                    renderLoggedNavbar();
                    renderEvents();
                } else {
                    alert('Такой логин уже существует'); // TODO Максим, добавь какую-нибудь обработку
                }
            }
        }

        if (target.id === 'postLogin') {
            let dataFromForm = new FormData(formBody);
            if (validation(formBody)) {
                let jsonData = JSON.stringify(Object.fromEntries(dataFromForm));
                let answer = await postLoginData(jsonData);
                console.log(answer);
                if (answer.ok) {
                    renderLoggedNavbar();
                    renderEvents();
                } else {
                    alert('Неверный логин или пароль'); // TODO Максим, добавь какую-нибудь обработку
                }
            }
        }

        if (target.id === 'postProfile') {
            let dataSpanForm = new FormData(target.parentNode);
            let dataSpanFormJson = JSON.stringify(Object.fromEntries(dataSpanForm));
            console.log(dataSpanFormJson);
            let postProfileAnswer = await postProfileData(dataSpanFormJson);
            renderLoggedNavbar();
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
                    alert('неведомая ошибка');
                }
            }
        }
    }
});

/**
 * Функция для построения страницы одного ивента
 * @param {uint64} Id - id ивента
 */

async function renderEventPage(Id) {
    wrapper.style.backgroundImage =  'url("templates/one-event-page/img/event-page-background.jpg") no-repeat top right';
    wrapper.innerHTML = '';

    const eventJson = await getEventById(Id);
    wrapper.innerHTML = oneEventPageTemplate(eventJson);
}

/**
 * Функция для генерации страницы логина
 */

function renderLoginPage() {
    wrapper.style.backgroundImage =  'url("components/img/form-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    wrapper.innerHTML = loginTemplate();
    //logoutFunc();
}

/**
 * Функция для генерации страницы логаута
 */

function renderLogout() {
    navbar.innerHTML = '';
    navbar.innerHTML = navbarTemplate({});
    logoutFunc();
    renderEvents();
}

/**
 * Функция для рендера страницы профиля
 */

async function renderMyProfilePage() {
    wrapper.style.background = 'url("components/img/my-profile-background.jpg") no-repeat top / cover';
    wrapper.innerHTML = '';
    let profileData = await getLoggedProfileData();
    let profileDataJson = await profileData.json();

    wrapper.innerHTML = myProfileTemplate(profileDataJson);
    let ava = document.getElementById('profileAvatar');
    ava.style.background = `url(${imgUrl + profileDataJson.Uid}) no-repeat`;
}

/**
 * Функция для рендера навбара залогинненого пользователя
 */

async function renderLoggedNavbar() {
    let loginCheck = await getLoggedProfileData();
    console.log(loginCheck.ok);
    if (loginCheck.ok) {
        
        let profileInfo = await loginCheck.json();
        let navbarRow = document.getElementById('navbarRow');
        navbarRow.innerHTML = '';
        navbarRow.innerHTML = navbarLoggedTemplate(profileInfo);
        let navbarAvatar = document.getElementById('navbar-avatar');
        
        navbarAvatar.style.background = `url(${imgUrl + profileInfo.Uid}) no-repeat center / cover`;
    }
}

/**
 * Функция для рендера главной страницы
 */

async function init() {
    navbar.innerHTML = navbarTemplate({}); 
    renderLoggedNavbar();
    renderEvents();
}

init();